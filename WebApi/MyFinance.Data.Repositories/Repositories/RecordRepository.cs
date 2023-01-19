using Microsoft.EntityFrameworkCore;
using MyFinance.Data.Abstractions.Repositories;
using MyFinance.DataBase;
using MyFinance.DataBase.Entities;

namespace MyFinance.Data.Repositories.Repositories;

/// <summary>
/// Addition repository for the record entity
/// that provides extra methods than the generic repository.
/// </summary>
/// <remarks>
/// This repository was created only as an example for Szymon Glowacki.
/// This approach should be used if using the Get method from the generic repository in the service is not recommended.
/// In this case the Get method becomes private or is not used at all.
/// We implement all entity-specific methods in this repository.
/// </remarks>
public class RecordRepository : Repository<Record>, IRecordRepository
{
    public RecordRepository(MyFinanceDbContext dbContext) : base(dbContext)
    {

    }

    /// <inheritdoc />
    public async Task<bool> IsRecordExistByIdAsync(Guid id)
    {
        var entity = await Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(record => record.Id.Equals(id));

        return entity != null;
    }

}