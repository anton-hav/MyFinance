using AutoMapper;
using Hangfire;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.Core.Abstractions.SchedulerManagers;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;

namespace MyFinance.WebApi.SchedulerManagers;

/// <summary>
///     Provides methods to interact with the scheduler.
/// </summary>
public class SchedulerManager : ISchedulerManager
{
    private readonly IMapper _mapper;
    private readonly IRecordService _recordService;
    private readonly IRecurringJobManager _jobManager;
    private readonly IPlannedTransactionService _plannedTransactionService;

    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="recordService"></param>
    /// <param name="jobManager">schedule job manager from the schedule provider</param>
    /// <param name="plannedTransactionService">planned transaction service from IOC</param>
    public SchedulerManager(IMapper mapper,
        IRecordService recordService,
        IRecurringJobManager jobManager,
        IPlannedTransactionService plannedTransactionService)
    {
        _mapper = mapper;
        _recordService = recordService;
        _jobManager = jobManager;
        _plannedTransactionService = plannedTransactionService;
    }

    #region CREATE JOBS

    /// <inheritdoc />
    public void CreateJobByPlannedTransaction(PlannedTransactionDto dto)
    {
        _jobManager.AddOrUpdate(dto.JobId, () =>
                _recordService.CreateRecordByPlannedTransactionIdAsync(dto.Id),
            dto.Crone);
    }

    #endregion CREATE JOBS

    #region DELETE JOBS

    /// <inheritdoc />
    public async Task RemoveJobByPlannedTransactionIdAsync(Guid plannedTransactionId)
    {
        var plannedTransaction = await _plannedTransactionService.GetByIdAsync(plannedTransactionId);

        _jobManager.RemoveIfExists(plannedTransaction?.JobId);
    }

    /// <inheritdoc />
    public async Task RemoveAllJobsByCategoryIdAsync(Guid categoryId)
    {
        var transactions = await _plannedTransactionService
            .GetPlannedTransactionsByCategoryIdAsync(categoryId);

        Parallel.ForEach(transactions, transaction => _jobManager.RemoveIfExists(transaction.JobId));
    }

    #endregion DELETE JOBS
}