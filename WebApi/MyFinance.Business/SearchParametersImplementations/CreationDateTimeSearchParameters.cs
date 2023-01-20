using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchParametersImplementations;

/// <summary>
///     Represent the search parameters related to the date of creation.
/// </summary>
public class CreationDateTimeSearchParameters : ICreationDateTimeSearchParameters
{
    /// <inheritdoc />
    public DateTime? Created { get; set; }
}