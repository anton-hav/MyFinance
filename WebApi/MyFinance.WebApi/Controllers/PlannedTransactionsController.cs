using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.Core.Abstractions.IdentityManagers;
using MyFinance.Core.Abstractions.SchedulerManagers;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;
using MyFinance.Core.Exceptions;
using MyFinance.WebApi.Authorization;
using MyFinance.WebApi.Filters.ExceptionFilters;
using MyFinance.WebApi.Models.General.Responses;
using MyFinance.WebApi.Models.PlannedTransactions.Requests;
using MyFinance.WebApi.Models.PlannedTransactions.Responses;
using MyFinance.WebApi.Utils;

namespace MyFinance.WebApi.Controllers;

/// <summary>
///     Controller that provides API endpoints for the Categories resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
[Permission("UserOnly")]
[TypeFilter(typeof(InternalServerErrorFilter))]
public class PlannedTransactionsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPlannedTransactionService _plannedTransactionService;
    private readonly IUserManager _userManager;
    private readonly ICategoryService _categoryService;
    private readonly ISchedulerManager _schedulerManager;

    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="mapper">mapper from IOC</param>
    /// <param name="plannedTransactionService">planned transaction service from IOC</param>
    /// <param name="userManager">user manager from IOC</param>
    /// <param name="categoryService">category service from IOC</param>
    /// <param name="schedulerManager">schedule job manager from IOC</param>
    public PlannedTransactionsController(IMapper mapper,
        IPlannedTransactionService plannedTransactionService,
        IUserManager userManager,
        ICategoryService categoryService,
        ISchedulerManager schedulerManager)
    {
        _mapper = mapper;
        _plannedTransactionService = plannedTransactionService;
        _userManager = userManager;
        _categoryService = categoryService;
        _schedulerManager = schedulerManager;
    }

    /// <summary>
    ///     Get a planned transaction from the storage with specified id.
    /// </summary>
    /// <param name="id">a planned transaction unique identifier as a <see cref="Guid" /></param>
    /// <returns>A planned transaction with specified Id</returns>
    /// <response code="200">Returns a record corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [TypeFilter(typeof(NotFoundExceptionFilter))]
    [ProducesResponseType(typeof(PlannedTransactionResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetPlannedTransactionById(Guid id)
    {
        var userId = _userManager.GetUserId();
        var dto = await _plannedTransactionService.GetPlannedTransactionByIdAndUserIdAsync(id, userId);
        var record = _mapper.Map<PlannedTransactionResponseModel>(dto);
        return Ok(record);
    }

    /// <summary>
    ///     Get planned transactions from the storage.
    /// </summary>
    /// <param name="model">planned transactions request model</param>
    /// <returns>planned transactions that match the specified model parameters.</returns>
    /// <response code="200">Returns all records that match the specified parameters.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<PlannedTransactionResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPlannedTransactions([FromQuery] GetPlannedTransactionRequestModel model)
    {
        var searchParams = _mapper.Map<PlannedTransactionsSearchModel>(model);

        var userId = _userManager.GetUserId();
        searchParams.User = new UserSearchParameters { UserId = userId };
        var categories =
            await _plannedTransactionService.GetPlannedTransactionsBySearchParametersAsync(searchParams);
        var response = _mapper.Map<IEnumerable<PlannedTransactionResponseModel>>(categories);

        return Ok(response);
    }

    /// <summary>
    ///     Add a new planned transaction to the storage.
    /// </summary>
    /// <param name="model">a planned transaction</param>
    /// <returns>A newly created planned transaction</returns>
    /// <response code="201">Returns the newly created planned transaction</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [TypeFilter(typeof(ConflictOnCreationExceptionFilter))]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [ProducesResponseType(typeof(PlannedTransactionResponseModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> AddPlannedTransaction([FromBody] AddPlannedTransactionRequestModel model)
    {
        var userId = _userManager.GetUserId();

        var isUserCategoryOwner =
            await _categoryService.IsUserOwnerForCategoryAsync(model.CategoryId, userId);

        if (!isUserCategoryOwner)
            throw new ArgumentException(
                "The current user has no rights to create planned transaction for the specified category.",
                nameof(model));

        var isExist =
            await _plannedTransactionService.IsPlannedTransactionExistByParametersAsync(model.CategoryId, model.Price,
                model.Crone);

        if (isExist)
            throw new ConflictWithExistingRecordException("The same entry already exists in the storage.",
                nameof(model));

        var isCronValid = CronValidator.IsCronValid(model.Crone);

        if (!isCronValid)
            throw new ArgumentException("The cron expression is invalid.");

        var dto = _mapper.Map<PlannedTransactionDto>(model);
        dto.Id = Guid.NewGuid();
        dto.JobId = Guid.NewGuid().ToString("D");

        var result = await _plannedTransactionService.CreateAsync(dto);

        _schedulerManager.CreateJobByPlannedTransaction(dto);

        var response = _mapper.Map<PlannedTransactionResponseModel>(dto);

        return CreatedAtAction(nameof(GetPlannedTransactionById), new { id = response.Id }, response);
    }

    /// <summary>
    ///     Delete a planned transaction with specified Id from the storage.
    /// </summary>
    /// <param name="id">a planned transaction unique identifier as a <see cref="Guid" /></param>
    /// <returns>no content response</returns>
    /// <response code="204">Successful deletion</response>
    /// <response code="400">Request contains null object or invalid object type.</response>
    /// <response code="404">Fail to find a record with the specified Id in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpDelete("{id}")]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [TypeFilter(typeof(NotFoundExceptionFilter))]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePlannedTransaction(Guid id)
    {
        if (id.Equals(default))
            throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");

        var userId = _userManager.GetUserId();

        var isUserPlannedTransactionOwner =
            await _plannedTransactionService.IsUserOwnerForPlannedTransactionAsync(id, userId);

        if (!isUserPlannedTransactionOwner)
            throw new ArgumentException(
                "Fail to find a record in the storage or the current user has no rights to delete the record specified by Id.",
                nameof(id));

        await _schedulerManager.RemoveJobByPlannedTransactionIdAsync(id);

        var result = await _plannedTransactionService.DeleteAsync(id);

        return NoContent();
    }
}