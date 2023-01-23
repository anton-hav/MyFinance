namespace MyFinance.WebApi.Models.Records.Responses;

/// <summary>
///     Response model for the record
/// </summary>
public class RecordResponseModel
{
    /// <summary>
    ///     An unique identifier
    /// </summary>
    public Guid Id { get; set; }

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