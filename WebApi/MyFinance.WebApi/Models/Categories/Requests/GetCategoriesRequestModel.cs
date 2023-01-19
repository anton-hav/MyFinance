using MyFinance.Core;

namespace MyFinance.WebApi.Models.Categories.Requests;

/// <summary>
///     Request model to get categories.
/// </summary>
public class GetCategoriesRequestModel
{
    /// <summary>
    ///     Category type.
    ///     (Income = 0, Expenses = 1)
    /// </summary>
    public CategoryType Type { get; set; }
}