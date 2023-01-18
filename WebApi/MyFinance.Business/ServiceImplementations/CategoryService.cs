using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyFinance.Core;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;
using MyFinance.Data.Abstractions;
using MyFinance.DataBase.Entities;

namespace MyFinance.Business.ServiceImplementations;

/// <summary>
///     Provides methods to interact with categories.
/// </summary>
public class CategoryService : ICategoryService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    #region READ

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<CategoryDto> GetByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Categories.GetByIdAsync(id);
        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));
        var dto = _mapper.Map<CategoryDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<CategoryDto> GetCategoryByIdAndUserIdAsync(Guid id, Guid userId)
    {
        var entity = await _unitOfWork.Categories
            .Get()
            .Where(entity => entity.Id.Equals(id) && entity.UserId.Equals(userId))
            .AsNoTracking()
            .FirstOrDefaultAsync();

        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));

        var dto = _mapper.Map<CategoryDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<CategoryDto>> GetCategoriesBySearchParametersAsync(CategoryType categoryType, Guid userId)
    {
        var entities = await _unitOfWork.Categories
            .Get()
            .AsNoTracking()
            .Where(entity => entity.Type.Equals(categoryType)
                              && entity.UserId.Equals(userId))
            .Select(entity => _mapper.Map<CategoryDto>(entity))
            .ToArrayAsync();

        return entities;
    }

    /// <inheritdoc />
    public async Task<bool> IsCategoryExistByParametersAsync(string name, Guid userId, CategoryType categoryType)
    {
        var entity = await _unitOfWork.Categories
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Type.Equals(categoryType)
                                           && entity.UserId.Equals(userId)
                                           && entity.Name.Equals(name));

        return entity != null;
    }

    /// <inheritdoc />
    public async Task<bool> IsCategoryExistByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Categories
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id.Equals(id));

        return entity != null;
    }

    #endregion READ

    #region CREATE

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<int> CreateAsync(CategoryDto dto)
    {
        var entity = _mapper.Map<Category>(dto);

        if (entity == null)
            throw new ArgumentException("Mapping CategoryDto to Category was not possible.", nameof(dto));

        await _unitOfWork.Categories.AddAsync(entity);
        var result = await _unitOfWork.Commit();
        return result;
    }

    #endregion CREATE

    #region UPDATE

    /// <inheritdoc />
    public async Task<int> PatchAsync(Guid id, CategoryDto dto)
    {
        var sourceDto = await GetByIdAsync(id);

        var patchList = new List<PatchModel>();

        if (!dto.Name.Equals(sourceDto.Name))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.Name),
                PropertyValue = dto.Name
            });

        await _unitOfWork.Categories.PatchAsync(id, patchList);
        return await _unitOfWork.Commit();
    }

    #endregion UPDATE

    #region DELETE

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<int> DeleteAsync(Guid id)
    {
        var entity = await _unitOfWork.Categories.GetByIdAsync(id);

        if (entity == null) throw new ArgumentException("The categories for removing doesn't exist", nameof(id));

        // Todo: Add cascade deletion logic here.

        _unitOfWork.Categories.Remove(entity);
        return await _unitOfWork.Commit();
    }

    #endregion DELETE
}