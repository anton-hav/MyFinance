using MyFinance.Core.Abstractions.SearchModels;
using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve the amount of records from the storage.
/// </summary>
public class RecordsAmountSearchModel : IRecordsAmountSearchModel
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public IUserSearchParameters User { get; set; }

    /// <inheritdoc />
    public IRecordSearchParameters Record { get; set; }

    /// <inheritdoc />
    public ICreationDateTimeSearchParameters CreationDateTime { get; set; }
}