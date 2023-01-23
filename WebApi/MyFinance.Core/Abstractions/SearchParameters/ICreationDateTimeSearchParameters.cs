namespace MyFinance.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a datetime of the creation filter parameters.
/// </summary>
public interface ICreationDateTimeSearchParameters
{
    /// <summary>
    /// Filter parameters that represents the datetime of the creation.
    /// </summary>
    DateTime? Created { get; set; }

    /// <summary>
    ///     Start of the interval of the record creation period
    /// </summary>
    DateTime? DateFrom { get; set; }

    /// <summary>
    ///     End of the interval of the record creation period
    /// </summary>
    DateTime? DateTo { get; set; }
}