using MyFinance.Core.Abstractions.SearchModels;
using MyFinance.Core.DataTransferObjects;

namespace MyFinance.Core.Abstractions.Services;

/// <summary>
///     A service that provides methods to interact with planned transactions.
/// </summary>
public interface IPlannedTransactionService
{
    #region READ

    /// <summary>
    ///     Get planned transaction with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>a planned transaction that matches the id as a <see cref="PlannedTransactionDto" /></returns>
    Task<PlannedTransactionDto> GetByIdAsync(Guid id);

    /// <summary>
    ///     Get the planned transaction with specified id and user id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <param name="userId">the unique identifier of the creator as a <see cref="Guid" /></param>
    /// <returns>a record that matches parameters as a <see cref="RecordDto" /></returns>
    Task<PlannedTransactionDto> GetPlannedTransactionByIdAndUserIdAsync(Guid id, Guid userId);

    /// <summary>
    ///     Get planned transactions from the storage by search parameters.
    /// </summary>
    /// <param name="model">search model for planned transactions as a <see cref="IPlannedTransactionsSearchModel" /></param>
    /// <returns>planned transactions that matches search parameters</returns>
    Task<IEnumerable<PlannedTransactionDto>> GetPlannedTransactionsBySearchParametersAsync(IPlannedTransactionsSearchModel model);

    /// <summary>
    /// Checks if user is creator for specified planned transaction.
    /// </summary>
    /// <param name="id">a planned transaction unique identifier as a <see cref="Guid"/></param>
    /// <param name="userId">an unique identifier of the current user as a <see cref="Guid"/></param>
    /// <returns>A boolean</returns>
    Task<bool> IsUserOwnerForPlannedTransactionAsync(Guid id, Guid userId);
    
    #endregion READ


    #region CREATE

    /// <summary>
    ///     Create a new planned transaction record in the storage.
    /// </summary>
    /// <param name="dto"> planned transaction to create
    ///     <see cref="PlannedTransactionDto" />
    /// </param>
    /// <returns>the number of successfully created records in the storage.</returns>
    Task<int> CreateAsync(PlannedTransactionDto dto);

    #endregion CREATE


    #region UPDATE

    #endregion UPDATE


    #region DELETE

    /// <summary>
    ///     Remove a planned transaction with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>the number of successfully removed records from the storage.</returns>
    Task<int> DeleteAsync(Guid id);

    #endregion DELETE
}