using Microsoft.EntityFrameworkCore;

namespace MyFinance.DataBase;

public class MyFinanceDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
    }

    public MyFinanceDbContext(DbContextOptions<MyFinanceDbContext> options)
        : base(options)
    {
    }
}