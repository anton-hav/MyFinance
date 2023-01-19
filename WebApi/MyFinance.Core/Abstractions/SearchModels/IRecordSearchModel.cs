using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Core.Abstractions.SearchModels;

/// <summary>
///     Model for searching or filtering records in the storage.
/// </summary>
public interface IRecordSearchModel
{
    /// <summary>
    ///     Category search parameters.
    /// </summary>
    ICategorySearchParameters Category { get; set; }

    /// <summary>
    ///     Creation datetime search parameters
    /// </summary>
    ICreationDateTimeSearchParameters CreationDateTime { get; set; }

    /// <summary>
    ///     User search parameters
    /// </summary>
    IUserSearchParameters User { get; set; }
}