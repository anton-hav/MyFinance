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
    ///     Checks if the record exists in the storage by Id.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>A boolean</returns>
    Task<bool> IsRecordExistByIdAsync(Guid id);

    #endregion READ

    #region CREATE

    #endregion CREATE

    #region UPDATE

    #endregion UPDATE

    #region DELETE

    #endregion DELETE
}