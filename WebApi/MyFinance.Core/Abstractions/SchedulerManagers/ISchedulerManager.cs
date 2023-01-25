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
    void CreateJobByPlannedTransactionAsync(PlannedTransactionDto plannedTransaction);

    #endregion CREATE JOBS
}