using MyFinance.Core.Abstractions.SearchModels;
using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve the records count from the storage.
/// </summary>
public class RecordsCountSearchModel : IRecordsCountSearchModel
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public IUserSearchParameters User { get; set; }

    /// <inheritdoc />
    public IRecordSearchParameters Record { get; set; }
}