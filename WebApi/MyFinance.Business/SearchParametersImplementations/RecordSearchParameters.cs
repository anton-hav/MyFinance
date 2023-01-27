using MyFinance.Core;
using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchParametersImplementations;

/// <summary>
///     Represent the search parameters related to the record.
/// </summary>
public class RecordSearchParameters : IRecordSearchParameters
{
    /// <inheritdoc />
    public RecordStatus? RecordStatus { get; set; }
}