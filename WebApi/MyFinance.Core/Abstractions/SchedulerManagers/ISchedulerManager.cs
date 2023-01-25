using MyFinance.Core.DataTransferObjects;

namespace MyFinance.Core.Abstractions.SchedulerManagers;

/// <summary>
/// A manager that provides methods to interact with scheduler
/// </summary>
public interface ISchedulerManager
{
    #region CREATE JOBS

    /// <summary>
    /// Create new job that create new transaction records
    /// with data specified by planned transaction object.
    /// </summary>
    /// <param name="plannedTransaction">planned transaction as a <see cref="PlannedTransactionDto"/></param>
    void CreateJobByPlannedTransaction(PlannedTransactionDto plannedTransaction);

    #endregion CREATE JOBS


    #region DELETE JOBS

    /// <summary>
    /// Delete a job by planned transaction Id.
    /// </summary>
    /// <param name="plannedTransactionId">an unique identifier of the planned transaction</param>
    /// <returns>The Task</returns>
    Task RemoveJobByPlannedTransactionIdAsync(Guid plannedTransactionId);

    /// <summary>
    /// Delete jobs specified by Id category for the corresponding scheduled operations.
    /// </summary>
    /// <param name="categoryId">an unique identifier of the category</param>
    /// <returns>The Task</returns>
    Task RemoveAllJobsByCategoryIdAsync(Guid categoryId);

    #endregion DELETE JOBS
}