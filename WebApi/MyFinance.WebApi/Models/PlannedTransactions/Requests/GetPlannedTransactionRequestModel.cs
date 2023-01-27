using MyFinance.Core;

namespace MyFinance.WebApi.Models.PlannedTransactions.Requests;

/// <summary>
///     Request model to get planned transactions.
/// </summary>
public class GetPlannedTransactionRequestModel
{
    /// <summary>
    ///     A category unique identifier
    /// </summary>
    public Guid? CategoryId { get; set; }

    /// <summary>
    ///     Category type of the record category.
    /// </summary>
    public CategoryType? CategoryType { get; set; }
}