using MyFinance.Data.Abstractions;
using MyFinance.Data.Abstractions.Repositories;
using MyFinance.DataBase;
using MyFinance.DataBase.Entities;

namespace MyFinance.Data.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly MyFinanceDbContext _dbContext;
    public IRepository<User> Users { get; }
    public IRepository<Role> Roles { get; }
    public IRepository<RefreshToken> RefreshToken { get; }
    public IRepository<Category> Categories { get; }
    public IRepository<Record> Records { get; }
    public IRecordRepository AdditionRecords { get; }
    public IRepository<PlannedTransaction> PlannedTransactions { get; }

    public UnitOfWork(MyFinanceDbContext dbContext, 
        IRepository<User> users, 
        IRepository<Role> roles, 
        IRepository<RefreshToken> refreshToken, 
        IRepository<Category> categories, 
        IRepository<Record> records, 
        IRecordRepository additionRecords, 
        IRepository<PlannedTransaction> plannedTransactions)
    {
        _dbContext = dbContext;
        Users = users;
        Roles = roles;
        RefreshToken = refreshToken;
        Categories = categories;
        Records = records;
        AdditionRecords = additionRecords;
        PlannedTransactions = plannedTransactions;
    }
    
    public async Task<int> Commit()
    {
        return await _dbContext.SaveChangesAsync();
    }
}