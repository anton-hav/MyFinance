namespace MyFinance.WebApi.Models.PlannedTransactions.Responses;

/// <summary>
///     Response model for the planned transaction.
/// </summary>
public class PlannedTransactionResponseModel
{
    /// <summary>
    ///     An unique identifier
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    ///     An unique identifier of the category for which the transaction is planned
    /// </summary>
    public Guid CategoryId { get; set; }

    /// <summary>
    ///     Amount of the planned transaction
    /// </summary>
    public double Price { get; set; }

    /// <summary>
    ///     Cron expression as a string
    /// </summary>
    public string Crone { get; set; }
}