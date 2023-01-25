using Microsoft.EntityFrameworkCore;
using MyFinance.DataBase.Entities;

namespace MyFinance.DataBase;

public class MyFinanceDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Record> Records { get; set; }
    public DbSet<PlannedTransaction> PlannedTransactions { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>()
            .HasIndex(user => user.Email)
            .IsUnique();

        builder.Entity<Role>()
            .HasIndex(role => role.Name)
            .IsUnique();

        builder.Entity<Category>()
            .HasIndex(category => new
            {
                category.Name,
                category.Type,
                category.UserId,
            })
            .IsUnique();

        builder.Entity<PlannedTransaction>()
            .HasIndex(transaction => new
            {
                transaction.CategoryId,
                transaction.Price,
                transaction.Crone,
            })
            .IsUnique();

        builder.Entity<PlannedTransaction>()
            .HasIndex(transaction => transaction.JobId)
            .IsUnique();

    }

    public MyFinanceDbContext(DbContextOptions<MyFinanceDbContext> options)
        : base(options)
    {
    }
}