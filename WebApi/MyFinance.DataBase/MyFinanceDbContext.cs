﻿using Microsoft.EntityFrameworkCore;
using MyFinance.DataBase.Entities;

namespace MyFinance.DataBase;

public class MyFinanceDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>()
            .HasIndex(user => user.Email)
            .IsUnique();

        builder.Entity<Role>()
            .HasIndex(role => role.Name)
            .IsUnique();
    }

    public MyFinanceDbContext(DbContextOptions<MyFinanceDbContext> options)
        : base(options)
    {
    }
}