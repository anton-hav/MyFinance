using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Core.Abstractions.SearchModels;

/// <summary>
/// Model for searching the records count in the storage.
/// </summary>
public interface IRecordsCountSearchModel
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