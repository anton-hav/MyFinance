using MyFinance.Core;

namespace MyFinance.WebApi.Models.RecordsCount.Request;

/// <summary>
/// Request model to get records count.
/// </summary>
public class GetRecordsCountRequestModel
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