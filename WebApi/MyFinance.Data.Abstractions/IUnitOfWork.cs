using MyFinance.Data.Abstractions.Repositories;
using MyFinance.DataBase.Entities;

namespace MyFinance.Data.Abstractions;

public interface IUnitOfWork
{
    IRepository<User> Users { get; }
    IRepository<Role> Roles { get; }
    IRepository<RefreshToken> RefreshToken { get; }
    Task<int> Commit();
}