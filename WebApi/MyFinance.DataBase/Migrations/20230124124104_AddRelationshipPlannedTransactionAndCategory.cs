using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFinance.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationshipPlannedTransactionAndCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK_PlannedTransactions_Categories_CategoryId",
                table: "PlannedTransactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlannedTransactions_Categories_CategoryId",
                table: "PlannedTransactions");
        }
    }
}
