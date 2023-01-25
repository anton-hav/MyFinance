using AutoMapper;
using Hangfire;
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

    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="recordService"></param>
    /// <param name="jobManager">schedule job manager from the schedule provider</param>
    public SchedulerManager(IMapper mapper,
        IRecordService recordService,
        IRecurringJobManager jobManager)
    {
        _mapper = mapper;
        _recordService = recordService;
        _jobManager = jobManager;
    }

    /// <inheritdoc />
    public void CreateJobByPlannedTransactionAsync(PlannedTransactionDto dto)
    {
        _jobManager.AddOrUpdate(dto.JobId, () => _recordService.CreateRecordByPlannedTransactionIdAsync(dto.Id),
            dto.Crone);
    }




}