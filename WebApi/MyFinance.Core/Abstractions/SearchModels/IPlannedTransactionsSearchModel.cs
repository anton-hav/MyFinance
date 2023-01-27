using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Core.Abstractions.SearchModels;

/// <summary>
///     Model for searching or filtering planned transactions in the storage.
/// </summary>
public interface IPlannedTransactionsSearchModel
{
    /// <summary>
    ///     Category search parameters.
    /// </summary>
    ICategorySearchParameters Category { get; set; }

    /// <summary>
    ///     User search parameters
    /// </summary>
    IUserSearchParameters User { get; set; }
}