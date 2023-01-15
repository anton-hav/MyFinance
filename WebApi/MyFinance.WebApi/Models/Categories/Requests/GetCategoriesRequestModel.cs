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

    /// <summary>
    ///     The unique identifier of the parent category for the requested records.
    ///     (For the root category the value should be empty).
    /// </summary>
    public Guid? ParentCategoryId { get; set; }
}