namespace MyFinance.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a record filter parameters.
/// </summary>
public interface IRecordSearchParameters
{
    /// <summary>
    /// Filter parameters that represents the status of the record.
    /// </summary>
    public RecordStatus? RecordStatus { get; set; }
}