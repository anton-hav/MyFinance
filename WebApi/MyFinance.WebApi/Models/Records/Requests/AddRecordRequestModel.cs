namespace MyFinance.WebApi.Models.Records.Requests;

/// <summary>
///     Request model to create the record
/// </summary>
public class AddRecordRequestModel
{
    /// <summary>
    ///     Amount of record
    /// </summary>
    public double Price { get; set; }

    /// <summary>
    ///     Comment of record
    /// </summary>
    public string? Comment { get; set; }

    /// <summary>
    ///     Date of creation
    /// </summary>
    public DateTime CreatedDate { get; set; }

    /// <summary>
    ///     A category unique identifier
    /// </summary>
    public Guid CategoryId { get; set; }
}