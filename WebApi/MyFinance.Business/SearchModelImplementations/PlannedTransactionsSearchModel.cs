using MyFinance.Core.Abstractions.SearchModels;
using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve planned transactions from the storage.
/// </summary>
public class PlannedTransactionsSearchModel : IPlannedTransactionsSearchModel
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public IUserSearchParameters User { get; set; }
}