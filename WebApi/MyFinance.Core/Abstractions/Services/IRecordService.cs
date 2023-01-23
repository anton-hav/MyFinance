using MyFinance.Core.Abstractions.SearchModels;
using MyFinance.Core.DataTransferObjects;

namespace MyFinance.Core.Abstractions.Services;

/// <summary>
///     A service that provides methods to interact with records.
/// </summary>
public interface IRecordService
{
    #region READ

    /// <summary>
    ///     Get record with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>a record that matches the id as a <see cref="RecordDto" /></returns>
    Task<RecordDto> GetByIdAsync(Guid id);

    /// <summary>
    ///     Get the record with specified id and user id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <param name="userId">the unique identifier of the creator as a <see cref="Guid" /></param>
    /// <returns>a record that matches parameters as a <see cref="RecordDto" /></returns>
    Task<RecordDto> GetRecordByIdAndUserIdAsync(Guid id, Guid userId);

    /// <summary>
    ///     Get records from the storage by search parameters.
    /// </summary>
    /// <param name="model">search model for records as a <see cref="IRecordSearchModel" /></param>
    /// <returns>records that matches search parameters</returns>
    Task<IEnumerable<RecordDto>> GetRecordsBySearchParametersAsync(IRecordSearchModel model);

    /// <summary>
    ///     Get records count from the storage by search parameters.
    /// </summary>
    /// <param name="model">search model for records as a <see cref="IRecordsCountSearchModel" /></param>
    /// <returns>number of records matching the search model.</returns>
    Task<int> GetRecordsCountBySearchParametersAsync(IRecordsCountSearchModel model);

    /// <summary>
    ///     Checks if the record exists in the storage by Id.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>A boolean</returns>
    Task<bool> IsRecordExistByIdAsync(Guid id);

    /// <summary>
    /// Checks if user is creator for specified record.
    /// </summary>
    /// <param name="id">a record unique identifier as a <see cref="Guid"/></param>
    /// <param name="userId">an unique identifier of the current user as a <see cref="Guid"/></param>
    /// <returns>A boolean</returns>
    Task<bool> IsUserOwnerForRecordAsync(Guid id, Guid userId);

    #endregion READ

    #region CREATE

    /// <summary>
    ///     Create a new cash flow record in the storage.
    /// </summary>
    /// <param name="dto">a record for creation as a <see cref="RecordDto" /></param>
    /// <returns>the number of successfully created records in the storage</returns>
    Task<int> CreateAsync(RecordDto dto);

    #endregion CREATE

    #region UPDATE

    /// <summary>
    ///     Patch record with specified id in the storage
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <param name="dto">a patch model as a <see cref="RecordDto" /></param>
    /// <returns>the number of successfully patched records in the storage.</returns>
    Task<int> PatchAsync(Guid id, RecordDto dto);

    #endregion UPDATE

    #region DELETE

    /// <summary>
    ///     Remove a record with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>the number of successfully removed records from the storage.</returns>
    Task<int> DeleteAsync(Guid id);

    #endregion DELETE
}