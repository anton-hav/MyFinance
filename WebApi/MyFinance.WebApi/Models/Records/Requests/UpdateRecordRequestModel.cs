using MyFinance.Core;

namespace MyFinance.WebApi.Models.Records.Requests;

/// <summary>
///     Request model to create or update the record
/// </summary>
public class UpdateRecordRequestModel
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
    /// Status of the record
    /// </summary>
    public RecordStatus Status { get; set; }

    /// <summary>
    ///     A category unique identifier
    /// </summary>
    public Guid CategoryId { get; set; }
}