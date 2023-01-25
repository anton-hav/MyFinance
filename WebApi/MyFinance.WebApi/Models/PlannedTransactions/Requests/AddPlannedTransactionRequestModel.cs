namespace MyFinance.WebApi.Models.PlannedTransactions.Requests;

/// <summary>
///     Request model to create the planned transaction
/// </summary>
public class AddPlannedTransactionRequestModel
{
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