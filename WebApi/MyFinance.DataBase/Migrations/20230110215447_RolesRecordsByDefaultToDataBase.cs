﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFinance.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class RolesRecordsByDefaultToDataBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    {Guid.NewGuid().ToString("D"), "Admin"},
                    {Guid.NewGuid().ToString("D"), "User"}
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
