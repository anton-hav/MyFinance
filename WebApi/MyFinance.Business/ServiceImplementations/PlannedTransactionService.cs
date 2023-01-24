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
///     Provides methods to interact with categories.
/// </summary>
public class PlannedTransactionService : IPlannedTransactionService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public PlannedTransactionService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    #region READ

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<PlannedTransactionDto> GetByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.PlannedTransactions.GetByIdAsync(id);
        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));
        var dto = _mapper.Map<PlannedTransactionDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<RecordDto> GetPlannedTransactionByIdAndUserIdAsync(Guid id, Guid userId)
    {
        var entity = await _unitOfWork.PlannedTransactions
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
    public async Task<IEnumerable<PlannedTransactionDto>> GetPlannedTransactionsBySearchParametersAsync(IPlannedTransactionsSearchModel model)
    {
        var entities = _unitOfWork.PlannedTransactions.Get();

        entities = GetQueryWithCategoryFilter(entities, model.Category);
        entities = GetQueryWithUserFilter(entities, model.User);

        var result = (await entities.AsNoTracking().ToListAsync())
            .Select(entity => _mapper.Map<PlannedTransactionDto>(entity))
            .ToArray();

        return result;
    }

    /// <inheritdoc />
    public async Task<bool> IsUserOwnerForPlannedTransactionAsync(Guid id, Guid userId)
    {
        var entity = await _unitOfWork.PlannedTransactions
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
    public async Task<int> CreateAsync(PlannedTransactionDto dto)
    {
        var entity = _mapper.Map<PlannedTransaction>(dto);

        if (entity == null)
            throw new ArgumentException("Mapping CategoryDto to Category was not possible.", nameof(dto));

        await _unitOfWork.PlannedTransactions.AddAsync(entity);
        var result = await _unitOfWork.Commit();
        return result;
    }

    #endregion CREATE

    #region UPDATE

    #endregion UPDATE

    #region DELETE

    /// <inheritdoc /> 
    /// <exception cref="ArgumentException"></exception>
    public async Task<int> DeleteAsync(Guid id)
    {
        var entity = await _unitOfWork.PlannedTransactions.GetByIdAsync(id);

        if (entity == null) throw new ArgumentException("The categories for removing doesn't exist", nameof(id));

        _unitOfWork.PlannedTransactions.Remove(entity);
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
    private IQueryable<PlannedTransaction> GetQueryWithCategoryFilter(IQueryable<PlannedTransaction> query, ICategorySearchParameters category)
    {
        if (category.CategoryId != null && !category.CategoryId.Equals(default))
        {
            query = query.Where(entity => entity.CategoryId.Equals(category.CategoryId));
        }
        else
        {
            if (category.CategoryType != null && Enum.IsDefined(typeof(CategoryType), category.CategoryType))
            {
                query = query.Where(entity => entity.Category.Type.Equals(category.CategoryType));
            }
        }

        return query;
    }

    /// <summary>
    ///     Get query with user filters specified user search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="user">user search parameters as a <see cref="IUserSearchParameters" /></param>
    /// <returns>a query that includes user filter.</returns>
    private IQueryable<PlannedTransaction> GetQueryWithUserFilter(IQueryable<PlannedTransaction> query, IUserSearchParameters user)
    {
        if (user.UserId != null && !user.UserId.Equals(default))
            query = query.Where(entity => entity.Category.UserId.Equals(user.UserId));

        return query;
    }

    #endregion Private methods
}