using MyFinance.Core;

namespace MyFinance.WebApi.Models.Categories.Requests;

/// <summary>
///     Request model to create category
/// </summary>
public class AddCategoryRequestModel
{
    /// <summary>
    ///     Category name
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    ///     Category type.
    ///     (Income = 0, Expenses = 1)
    /// </summary>
    public CategoryType Type { get; set; }
}