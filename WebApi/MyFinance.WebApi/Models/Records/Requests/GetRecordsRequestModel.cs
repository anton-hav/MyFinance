namespace MyFinance.WebApi.Models.Records.Requests;

/// <summary>
///     Request model to get records.
/// </summary>
public class GetRecordsRequestModel
{
    /// <summary>
    ///     Date of creation
    /// </summary>
    public DateTime? CreatedDate { get; set; }

    /// <summary>
    ///     A category unique identifier
    /// </summary>
    public Guid? CategoryId { get; set; }
}