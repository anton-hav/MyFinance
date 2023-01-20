using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchParametersImplementations;

/// <summary>
/// Represent the search parameters related to the category.
/// </summary>
public class CategorySearchParameters : ICategorySearchParameters
{
    /// <inheritdoc />
    public Guid? CategoryId { get; set; }
}