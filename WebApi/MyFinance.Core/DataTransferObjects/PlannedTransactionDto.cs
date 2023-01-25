namespace MyFinance.Core.DataTransferObjects;

/// <summary>
///     Data transfer object for the planned transaction.
/// </summary>
public class PlannedTransactionDto
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

    /// <summary>
    ///     An unique identifier of the scheduled job
    /// </summary>
    /// <remarks>
    ///     You can use an entity identifier,
    ///     but using a separate field gives you more flexibility in expansion and migration.
    /// </remarks>
    public string JobId { get; set; }
}