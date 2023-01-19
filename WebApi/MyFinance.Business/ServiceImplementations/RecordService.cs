using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyFinance.Core;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;
using MyFinance.Data.Abstractions;
using MyFinance.DataBase.Entities;

namespace MyFinance.Business.ServiceImplementations;

/// <summary>
///     Provides methods to interact with records.
/// </summary>
public class RecordService : IRecordService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public RecordService(IMapper mapper, 
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<RecordDto> GetByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Records.GetByIdAsync(id);
        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));
        var dto = _mapper.Map<RecordDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<bool> IsRecordExistByIdAsync(Guid id)
    {
        // Generic repository approach
        var entity = await _unitOfWork.Records
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id.Equals(id));

        return entity != null;

        // The extended generic repository approach
        // In this case, all generic repository methods and additional entity-specific methods are available.
        /*
        var entity = await _unitOfWork.AdditionRecords.IsRecordExistByIdAsync(id);
        return entity != null;
        */
    }


    #region CREATE

    #endregion CREATE

    #region UPDATE

    #endregion UPDATE

    #region DELETE


    #endregion DELETE
}