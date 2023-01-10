using MyFinance.Data.Abstractions;
using MyFinance.DataBase;

namespace MyFinance.Data.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly MyFinanceDbContext _dbContext;


    public UnitOfWork(MyFinanceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<int> Commit()
    {
        return await _dbContext.SaveChangesAsync();
    }
}