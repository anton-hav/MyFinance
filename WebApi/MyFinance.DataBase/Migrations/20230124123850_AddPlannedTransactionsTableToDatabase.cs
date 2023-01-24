using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFinance.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class AddPlannedTransactionsTableToDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlannedTransactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Crone = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    JobId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlannedTransactions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlannedTransactions_CategoryId_Price_Crone",
                table: "PlannedTransactions",
                columns: new[] { "CategoryId", "Price", "Crone" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlannedTransactions_JobId",
                table: "PlannedTransactions",
                column: "JobId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlannedTransactions");
        }
    }
}
