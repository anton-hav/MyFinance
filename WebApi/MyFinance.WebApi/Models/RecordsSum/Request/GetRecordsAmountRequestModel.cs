using MyFinance.Core;

namespace MyFinance.WebApi.Models.RecordsSum.Request;

/// <summary>
/// Request model to get amount of records
/// </summary>
public class GetRecordsAmountRequestModel
{
    /// <summary>
    /// Search parameters that represents the category of records.
    /// </summary>
    public Guid? CategoryId { get; set; }

    /// <summary>
    ///     Category type of the record category.
    /// </summary>
    public CategoryType? CategoryType { get; set; }

    /// <summary>
    ///     Status of the record
    /// </summary>
    public RecordStatus? RecordStatus { get; set; }

    /// <summary>
    ///     Date of creation
    /// </summary>
    public DateTime? CreatedDate { get; set; }

    /// <summary>
    ///     Start of the interval of the record creation period
    /// </summary>
    public DateTime? DateFrom { get; set; }

    /// <summary>
    ///     End of the interval of the record creation period
    /// </summary>
    public DateTime? DateTo { get; set; }
}