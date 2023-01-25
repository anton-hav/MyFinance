using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyFinance.Core;
using MyFinance.Core.Abstractions.IdentityManagers;
using MyFinance.Core.Abstractions.SchedulerManagers;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;
using MyFinance.Core.Exceptions;
using MyFinance.WebApi.Authorization;
using MyFinance.WebApi.Filters.ExceptionFilters;
using MyFinance.WebApi.Models.Categories.Requests;
using MyFinance.WebApi.Models.Categories.Responses;
using MyFinance.WebApi.Models.General.Responses;
using MyFinance.WebApi.Policies;

namespace MyFinance.WebApi.Controllers;

/// <summary>
///     Controller that provides API endpoints for the Categories resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
[TypeFilter(typeof(InternalServerErrorFilter))]
public class CategoriesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ICategoryService _categoryService;
    private readonly IUserManager _userManager;
    private readonly ISchedulerManager _schedulerManager;

    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="mapper">mapper from IOC</param>
    /// <param name="categoryService">category service from IOC</param>
    /// <param name="userManager">user manager from IOC</param>
    /// <param name="schedulerManager">schedule job manager from IOC</param>
    public CategoriesController(IMapper mapper,
        ICategoryService categoryService,
        IUserManager userManager, 
        ISchedulerManager schedulerManager)
    {
        _mapper = mapper;
        _categoryService = categoryService;
        _userManager = userManager;
        _schedulerManager = schedulerManager;
    }

    /// <summary>
    ///     Get a category from the storage with specified id.
    /// </summary>
    /// <param name="id">a category unique identifier as a <see cref="Guid" /></param>
    /// <returns>A category with specified Id</returns>
    /// <response code="200">Returns a category corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [Permission("UserOnly")]
    [TypeFilter(typeof(NotFoundExceptionFilter))]
    [ProducesResponseType(typeof(CategoryResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCategoryById(Guid id)
    {
        var userId = _userManager.GetUserId();
        var dto = await _categoryService.GetCategoryByIdAndUserIdAsync(id, userId);
        var category = _mapper.Map<CategoryResponseModel>(dto);
        return Ok(category);
    }

    /// <summary>
    ///     Get categories from the storage.
    /// </summary>
    /// <param name="model">category request model</param>
    /// <returns>categories that match the specified model parameters.</returns>
    /// <response code="200">Returns all categories that match the specified parameters.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [Permission("UserOnly")]
    [ProducesResponseType(typeof(IEnumerable<CategoryResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetCategories([FromQuery] GetCategoriesRequestModel model)
    {
        var userId = _userManager.GetUserId();
        var categories =
            await _categoryService.GetCategoriesBySearchParametersAsync(model.Type, userId);
        var response = _mapper.Map<IEnumerable<CategoryResponseModel>>(categories);

        return Ok(response);
    }

    /// <summary>
    ///     Add a new category to the storage.
    /// </summary>
    /// <param name="model">a category</param>
    /// <returns>A newly created category</returns>
    /// <response code="201">Returns the newly created category</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">The same entry already exists in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [Permission("UserOnly")]
    [TypeFilter(typeof(ConflictOnCreationExceptionFilter))]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [ProducesResponseType(typeof(CategoryResponseModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> AddCategory([FromBody] AddCategoryRequestModel model)
    {
        var userId = _userManager.GetUserId();
        var isExist =
            await _categoryService.IsCategoryExistByParametersAsync(model.Name, userId, model.Type);
        if (isExist)
            throw new ConflictWithExistingRecordException("The same entry already exists in the storage.",
                nameof(model));
        
        var dto = _mapper.Map<CategoryDto>(model);
        dto.Id = Guid.NewGuid();
        dto.UserId = userId;
        var result = await _categoryService.CreateAsync(dto);

        var response = _mapper.Map<CategoryResponseModel>(dto);

        return CreatedAtAction(nameof(GetCategoryById), new { id = response.Id }, response);
    }

    /// <summary>
    ///     Patch a category with specified Id in the storage.
    /// </summary>
    /// <param name="id">a category unique identifier as a <see cref="Guid" /></param>
    /// <param name="model">a category used for patching</param>
    /// <returns>A category with specified Id.</returns>
    /// <response code="200">Returns the updated category</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="404">Fail to find a record with the specified Id in the storage.</response>
    /// <response code="409">The same entry already exists in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPatch("{id}")]
    [Permission("UserOnly")]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [TypeFilter(typeof(NotFoundExceptionFilter))]
    [TypeFilter(typeof(ConflictOnCreationExceptionFilter))]
    [ProducesResponseType(typeof(CategoryResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> PatchCategory(Guid id, [FromBody] UpdateCategoryRequestModel model)
    {
        if (id.Equals(default))
            throw new ArgumentException("A non-empty Id is required.", nameof(id));

        var isExistById = await _categoryService.IsCategoryExistByIdAsync(id);
        if (!isExistById)
            throw new ArgumentException("Fail to find a record with the specified Id in the storage",
                nameof(id));

        var userId = _userManager.GetUserId();

        var isValid = await CheckCategoryForEditAsync(id, model.Name, userId, model.Type);

        var dto = _mapper.Map<CategoryDto>(model);
        dto.Id = id;
        var result = await _categoryService.PatchAsync(id, dto);
        var response = _mapper.Map<CategoryResponseModel>(dto);

        return Ok(response);
    }

    /// <summary>
    ///     Delete a category with specified Id from the storage.
    /// </summary>
    /// <param name="id">a category unique identifier as a <see cref="Guid" /></param>
    /// <returns></returns>
    /// <response code="204">Successful deletion</response>
    /// <response code="400">Request contains null object or invalid object type.</response>
    /// <response code="404">Fail to find a record with the specified Id in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpDelete("{id}")]
    [Permission("UserOnly")]
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

        var isExistById = await _categoryService.IsUserOwnerForCategoryAsync(id, userId);

        if (!isExistById)
            throw new ArgumentException("Fail to find a record with the specified Id in the storage",
                nameof(id));

        await _schedulerManager.RemoveAllJobsByCategoryIdAsync(id);

        var result = await _categoryService.DeleteAsync(id);

        return NoContent();
    }

    /// <summary>
    ///     Validate a category model for update.
    /// </summary>
    /// <param name="id">a unique identifier that defines the category to be updated </param>
    /// <param name="categoryName">a category name</param>
    /// <param name="userId">the unique identifier of the creator</param>
    /// <param name="categoryType">category type as a <see cref="CategoryType" /></param>
    /// <returns>A boolean</returns>
    /// <exception cref="ArgumentNullException">If the id is empty.</exception>
    /// <exception cref="ConflictWithExistingRecordException">If the same entry already exists in the storage.</exception>
    private async Task<bool> CheckCategoryForEditAsync(Guid id, string categoryName, Guid userId,
        CategoryType categoryType)
    {
        var isExist = await _categoryService
            .IsCategoryExistByParametersAsync(categoryName, userId, categoryType);

        if (isExist)
        {
            if (!id.Equals(default))
            {
                var isCategoryTheSame = await IsCategoryTheSameAsync(id, categoryName, userId, categoryType);

                if (isCategoryTheSame) return true;
            }
            else
            {
                throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");
            }

            throw new ConflictWithExistingRecordException("The same entry already exists in the storage.",
                nameof(categoryName));
        }

        return true;
    }

    /// <summary>
    ///     Check if the existing category is the same.
    /// </summary>
    /// <remarks>
    ///     This check is necessary to ensure idempotent behavior of the PUT and PATCH method.
    /// </remarks>
    /// <param name="id">category unique identifier</param>
    /// <param name="categoryName">category name</param>
    /// <param name="userId">the unique identifier of the creator</param>
    /// <param name="categoryType">category type as a <see cref="CategoryType" /></param>
    /// <returns>A boolean</returns>
    private async Task<bool> IsCategoryTheSameAsync(Guid id, string categoryName, Guid userId,
        CategoryType categoryType)
    {
        var dto = await _categoryService.GetByIdAsync(id);
        return dto.Name.Equals(categoryName)
               && dto.UserId.Equals(userId)
               && dto.Type.Equals(categoryType);
    }
}