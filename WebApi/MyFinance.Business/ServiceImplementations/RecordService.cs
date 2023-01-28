using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyFinance.Core;
using MyFinance.Core.Abstractions.SearchModels;
using MyFinance.Core.Abstractions.SearchParameters;
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
    private readonly IPlannedTransactionService _plannedTransactionService;

    public RecordService(IMapper mapper,
        IUnitOfWork unitOfWork,
        IPlannedTransactionService plannedTransactionService)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _plannedTransactionService = plannedTransactionService;
    }

    #region READ

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
    /// <exception cref="ArgumentException"></exception>
    public async Task<RecordDto> GetRecordByIdAndUserIdAsync(Guid id, Guid userId)
    {
        var entity = await _unitOfWork.Records
            .Get()
            .Where(entity => entity.Id.Equals(id) && entity.Category.UserId.Equals(userId))
            .AsNoTracking()
            .FirstOrDefaultAsync();

        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));

        var dto = _mapper.Map<RecordDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<RecordDto>> GetRecordsBySearchParametersAsync(IRecordSearchModel model)
    {
        var entities = _unitOfWork.Records.Get();

        entities = GetQueryWithCategoryFilter(entities, model.Category);
        entities = GetQueryWithUserFilter(entities, model.User);
        entities = GetQueryWithRecordFilter(entities, model.Record);
        entities = GetQueryWithCreationDateTimeFilter(entities, model.CreationDateTime);

        var result = (await entities.AsNoTracking().ToListAsync())
            .Select(entity => _mapper.Map<RecordDto>(entity))
            .ToArray();

        return result;
    }

    /// <inheritdoc />
    public async Task<int> GetRecordsCountBySearchParametersAsync(IRecordsCountSearchModel model)
    {
        var entities = _unitOfWork.Records.Get();

        entities = GetQueryWithCategoryFilter(entities, model.Category);
        entities = GetQueryWithUserFilter(entities, model.User);

        var result = await entities.AsNoTracking().CountAsync();

        return result;
    }

    /// <inheritdoc />
    public async Task<double> GetRecordsAmountBySearchParametersAsync(IRecordsAmountSearchModel model)
    {
        var entities = _unitOfWork.Records.Get();

        entities = GetQueryWithCategoryFilter(entities, model.Category);
        entities = GetQueryWithUserFilter(entities, model.User);

        var result = (await entities.AsNoTracking().ToListAsync())
            .Select(entity => entity.Price)
            .Sum();

        return result;
    }

    /// <inheritdoc />
    public async Task<bool> IsRecordExistByIdAsync(Guid id)
    {
        // -------------------------EXAMPLE---------------------------------------------------------------------
        // | 1. Pure generic repository approach                                                               |
        // |---------------------------------------------------------------------------------------------------|
        // |                                                                                                   |
        // | var entity = await _unitOfWork.Records                                                            |
        // |     .Get()                                                                                        |    
        // |     .AsNoTracking()                                                                               |
        // |     .FirstOrDefaultAsync(entity => entity.Id.Equals(id));                                         |
        // |                                                                                                   |
        // | return entity != null;                                                                            |
        // |---------------------------------------------------------------------------------------------------|
        // | 2. The extended generic repository approach                                                       |
        // | In this case, all generic repository methods and additional entity-specific methods are available.|
        // | --------------------------------------------------------------------------------------------------|
        // |                                                                                                   |
        // | var result = await _unitOfWork.AdditionRecords.IsRecordExistByIdAsync(id);                        |
        // | return result;                                                                                    |
        // -----------------------------------------------------------------------------------------------------

        var result = await _unitOfWork.AdditionRecords.IsRecordExistByIdAsync(id);
        return result;
    }

    /// <inheritdoc />
    public async Task<bool> IsUserOwnerForRecordAsync(Guid id, Guid userId)
    {
        var entity = await _unitOfWork.Records
            .Get()
            .Where(entity => entity.Id.Equals(id) && entity.Category.UserId.Equals(userId))
            .AsNoTracking()
            .FirstOrDefaultAsync();

        return entity != null;
    }

    #endregion READ

    #region CREATE

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<int> CreateAsync(RecordDto dto)
    {
        var entity = _mapper.Map<Record>(dto);

        if (entity == null)
            throw new ArgumentException("Mapping RecordDto to Record was not possible.", nameof(dto));

        await _unitOfWork.Records.AddAsync(entity);
        var result = await _unitOfWork.Commit();
        return result;
    }

    /// <inheritdoc />
    public async Task CreateRecordByPlannedTransactionIdAsync(Guid plannedTransactionId)
    {
        var plannedTransaction = await _plannedTransactionService.GetByIdAsync(plannedTransactionId);

        var dto = _mapper.Map<RecordDto>(plannedTransaction);
        dto.Id = Guid.NewGuid();
        dto.CreatedDate = DateTime.UtcNow;
        dto.Comment = "Created based on the schedule";
        dto.Status = RecordStatus.Planned;

        var result = await CreateAsync(dto);
    }

    #endregion CREATE

    #region UPDATE

    /// <inheritdoc />
    public async Task<int> PatchAsync(Guid id, RecordDto dto)
    {
        var sourceDto = await GetByIdAsync(id);

        var patchList = new List<PatchModel>();

        if (!dto.CategoryId.Equals(sourceDto.CategoryId))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.CategoryId),
                PropertyValue = dto.CategoryId
            });

        if (!dto.Price.Equals(sourceDto.Price))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.Price),
                PropertyValue = dto.Price
            });

        if (!dto.CreatedDate.Equals(sourceDto.CreatedDate))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.CreatedDate),
                PropertyValue = dto.CreatedDate
            });

        if ((dto.Comment == null && sourceDto.Comment != null) ||
            (dto.Comment != null && !dto.Comment.Equals(sourceDto.Comment)))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.Comment),
                PropertyValue = dto.Comment
            });

        if (!dto.Status.Equals(sourceDto.Status)
            && Enum.IsDefined(typeof(RecordStatus), dto.Status))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.Status),
                PropertyValue = dto.Status
            });

        await _unitOfWork.Records.PatchAsync(id, patchList);
        return await _unitOfWork.Commit();
    }

    #endregion UPDATE

    #region DELETE

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<int> DeleteAsync(Guid id)
    {
        var entity = await _unitOfWork.Records.GetByIdAsync(id);

        if (entity == null) throw new ArgumentException("The records for removing doesn't exist", nameof(id));

        _unitOfWork.Records.Remove(entity);
        return await _unitOfWork.Commit();
    }

    #endregion DELETE

    #region Private methods

    /// <summary>
    ///     Get query with category filters specified category search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="category">category search parameters as a <see cref="ICategorySearchParameters" /></param>
    /// <returns>a query that includes category filter.</returns>
    private IQueryable<Record> GetQueryWithCategoryFilter(IQueryable<Record> query, ICategorySearchParameters category)
    {
        if (category.CategoryId != null && !category.CategoryId.Equals(default))
        {
            query = query.Where(entity => entity.CategoryId.Equals(category.CategoryId));
        }
        else
        {
            if (category.CategoryType != null && Enum.IsDefined(typeof(CategoryType), category.CategoryType))
                query = query.Where(entity => entity.Category.Type.Equals(category.CategoryType));
        }

        return query;
    }

    /// <summary>
    ///     Get query with user filters specified user search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="user">user search parameters as a <see cref="IUserSearchParameters" /></param>
    /// <returns>a query that includes user filter.</returns>
    private IQueryable<Record> GetQueryWithUserFilter(IQueryable<Record> query, IUserSearchParameters user)
    {
        if (user.UserId != null && !user.UserId.Equals(default))
            query = query.Where(entity => entity.Category.UserId.Equals(user.UserId));

        return query;
    }

    /// <summary>
    ///     Get query with datetime of the creation filters specified creation search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="creation">creation search parameters as a <see cref="ICreationDateTimeSearchParameters" /></param>
    /// <returns>a query that includes creation filter.</returns>
    private IQueryable<Record> GetQueryWithCreationDateTimeFilter(IQueryable<Record> query,
        ICreationDateTimeSearchParameters creation)
    {
        if (creation.Created != null && !creation.Created.Equals(default))
        {
            query = query.Where(entity => entity.CreatedDate.Equals(creation.Created));
        }
        else
        {
            if (creation.DateFrom != null && !creation.DateFrom.Equals(default))
                query = query.Where(entity => entity.CreatedDate > creation.DateFrom);

            if (creation.DateTo != null && !creation.DateTo.Equals(default))
                query = query.Where(entity => entity.CreatedDate <= creation.DateTo);
        }

        return query;
    }

    /// <summary>
    ///     Get query with record filters specified search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="filter">record search parameters as a <see cref="IRecordSearchParameters" /></param>
    /// <returns>a query that includes the record filter.</returns>
    private IQueryable<Record> GetQueryWithRecordFilter(IQueryable<Record> query, IRecordSearchParameters filter)
    {
        if (filter.RecordStatus != null && Enum.IsDefined(typeof(RecordStatus), filter.RecordStatus))
            query = query.Where(entity => entity.Status.Equals(filter.RecordStatus));

        return query;
    }

    #endregion Private methods
}