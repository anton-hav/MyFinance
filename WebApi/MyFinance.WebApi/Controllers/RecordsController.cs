using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.Core.Abstractions.IdentityManagers;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;
using MyFinance.WebApi.Authorization;
using MyFinance.WebApi.Filters.ExceptionFilters;
using MyFinance.WebApi.Models.General.Responses;
using MyFinance.WebApi.Models.Records.Requests;
using MyFinance.WebApi.Models.Records.Responses;

namespace MyFinance.WebApi.Controllers;

/// <summary>
///     Controller that provides API endpoints for the Records resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
[Permission("UserOnly")]
[TypeFilter(typeof(InternalServerErrorFilter))]
public class RecordsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IRecordService _recordService;
    private readonly IUserManager _userManager;
    private readonly ICategoryService _categoryService;

    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="mapper">mapper from IOC</param>
    /// <param name="recordService">record service from IOC</param>
    /// <param name="userManager">user manager from IOC</param>
    /// <param name="categoryService">category service from IOC</param>
    public RecordsController(IMapper mapper,
        IRecordService recordService,
        IUserManager userManager,
        ICategoryService categoryService)
    {
        _mapper = mapper;
        _recordService = recordService;
        _userManager = userManager;
        _categoryService = categoryService;
    }

    /// <summary>
    ///     Get a record from the storage with specified id.
    /// </summary>
    /// <param name="id">a record unique identifier as a <see cref="Guid" /></param>
    /// <returns>A record with specified Id</returns>
    /// <response code="200">Returns a record corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [TypeFilter(typeof(NotFoundExceptionFilter))]
    [ProducesResponseType(typeof(RecordResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRecordById(Guid id)
    {
        var userId = _userManager.GetUserId();
        var dto = await _recordService.GetRecordByIdAndUserIdAsync(id, userId);
        var record = _mapper.Map<RecordResponseModel>(dto);
        return Ok(record);
    }

    /// <summary>
    ///     Get records from the storage.
    /// </summary>
    /// <param name="model">records request model</param>
    /// <returns>records that match the specified model parameters.</returns>
    /// <response code="200">Returns all records that match the specified parameters.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<RecordResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRecords([FromQuery] GetRecordsRequestModel model)
    {
        var searchParams = _mapper.Map<RecordSearchModel>(model);

        var userId = _userManager.GetUserId();
        searchParams.User = new UserSearchParameters { UserId = userId };
        var categories =
            await _recordService.GetRecordsBySearchParametersAsync(searchParams);
        var response = _mapper.Map<IEnumerable<RecordResponseModel>>(categories);

        return Ok(response);
    }

    /// <summary>
    ///     Add a new record to the storage.
    /// </summary>
    /// <param name="model">a record</param>
    /// <returns>A newly created record</returns>
    /// <response code="201">Returns the newly created record</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [ProducesResponseType(typeof(RecordResponseModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> AddRecord([FromBody] AddRecordRequestModel model)
    {
        var userId = _userManager.GetUserId();

        var isUserCategoryOwner =
            await _categoryService.IsUserOwnerForCategoryAsync(model.CategoryId, userId);

        if (!isUserCategoryOwner)
            throw new ArgumentException(
                "The current user has no rights to create records for the specified category.", nameof(model));

        var dto = _mapper.Map<RecordDto>(model);
        dto.Id = Guid.NewGuid();
        var result = await _recordService.CreateAsync(dto);

        var response = _mapper.Map<RecordResponseModel>(dto);

        return CreatedAtAction(nameof(GetRecordById), new { id = response.Id }, response);
    }

    /// <summary>
    ///     Patch a cash flow record with specified Id in the storage.
    /// </summary>
    /// <param name="id">a record unique identifier as a <see cref="Guid" /></param>
    /// <param name="model">a record used for patching</param>
    /// <returns>A record with specified Id.</returns>
    /// <response code="200">Returns the updated record</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="404">Fail to find a record with the specified Id in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPatch("{id}")]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [TypeFilter(typeof(NotFoundExceptionFilter))]
    [ProducesResponseType(typeof(RecordResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> PatchRecord(Guid id, [FromBody] UpdateRecordRequestModel model)
    {
        if (id.Equals(default))
            throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");

        var userId = _userManager.GetUserId();
        var isUserCategoryOwner =
            await _categoryService.IsUserOwnerForCategoryAsync(model.CategoryId, userId);

        if (!isUserCategoryOwner)
            throw new ArgumentException(
                "The current user has no rights to create records for the specified category.", nameof(model));

        var isExistById = await _recordService.IsRecordExistByIdAsync(id);
        if (!isExistById)
            throw new ArgumentException("Fail to find a record with the specified Id in the storage",
                nameof(id));

        var dto = _mapper.Map<RecordDto>(model);
        dto.Id = id;
        var result = await _recordService.PatchAsync(id, dto);
        var response = _mapper.Map<RecordResponseModel>(dto);

        return Ok(response);
    }

    /// <summary>
    ///     Delete a record with specified Id from the storage.
    /// </summary>
    /// <param name="id">a record unique identifier as a <see cref="Guid" /></param>
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
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        if (id.Equals(default))
            throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");

        var userId = _userManager.GetUserId();

        var isUserRecordOwner =
            await _recordService.IsUserOwnerForRecordAsync(id, userId);

        if (!isUserRecordOwner)
            throw new ArgumentException(
                "Fail to find a record in the storage or the current user has no rights to delete the record specified by Id.",
                nameof(id));

        var result = await _recordService.DeleteAsync(id);

        return NoContent();
    }
}