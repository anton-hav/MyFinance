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
}