using MyFinance.Core.DataTransferObjects;

namespace MyFinance.Core.Abstractions.Services;

/// <summary>
///     A service that provides methods to interact with categories.
/// </summary>
public interface ICategoryService
{
    #region READ

    /// <summary>
    ///     Get category with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>a category that matches the id as a <see cref="CategoryDto" /></returns>
    Task<CategoryDto> GetByIdAsync(Guid id);

    /// <summary>
    ///     Get the category with specified id and user id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <param name="userId">the unique identifier of the creator as a <see cref="Guid" /></param>
    /// <returns>a category that matches the id as a <see cref="CategoryDto" /></returns>
    Task<CategoryDto> GetCategoryByIdAndUserIdAsync(Guid id, Guid userId);

    /// <summary>
    ///     Get categories from storage by search parameters.
    /// </summary>
    /// <param name="categoryType">category type as a <see cref="CategoryType" /></param>
    /// <param name="userId">the unique identifier of the creator as a <see cref="Guid" /></param>
    /// <returns>child categories for the requested category id.</returns>
    Task<IEnumerable<CategoryDto>> GetCategoriesBySearchParametersAsync(CategoryType categoryType,
        Guid userId);

    /// <summary>
    ///     Checks if the record with the same parameters exists in the storage.
    /// </summary>
    /// <param name="name">name of category as a <see cref="string" /></param>
    /// <param name="userId">the unique identifier of the creator as a <see cref="Guid" /></param>
    /// <param name="categoryType">category type as a <see cref="CategoryType" /></param>
    /// <returns>A boolean</returns>
    Task<bool> IsCategoryExistByParametersAsync(string name, Guid userId, CategoryType categoryType);

    /// <summary>
    ///     Checks if the record exists in the storage by Id.
    /// </summary>
    /// <param name="id">unique identifier as a <see cref="Guid" /></param>
    /// <returns>A boolean</returns>
    Task<bool> IsCategoryExistByIdAsync(Guid id);

    #endregion READ

    #region CREATE

    /// <summary>
    ///     Create a new category record in the storage.
    /// </summary>
    /// <param name="dto">
    ///     <see cref="CategoryDto" />
    /// </param>
    /// <returns>the number of successfully created records in the storage.</returns>
    Task<int> CreateAsync(CategoryDto dto);

    #endregion CREATE

    #region UPDATE

    /// <summary>
    ///     Patch category with specified id in the storage
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <param name="dto">
    ///     <see cref="CategoryDto" />
    /// </param>
    /// <returns>the number of successfully patched records in the storage.</returns>
    Task<int> PatchAsync(Guid id, CategoryDto dto);

    #endregion UPDATE

    #region DELETE

    /// <summary>
    ///     Remove a category with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>the number of successfully removed records from the storage.</returns>
    Task<int> DeleteAsync(Guid id);

    #endregion
}