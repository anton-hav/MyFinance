namespace MyFinance.Data.Abstractions;

public interface IUnitOfWork
{
    Task<int> Commit();
}