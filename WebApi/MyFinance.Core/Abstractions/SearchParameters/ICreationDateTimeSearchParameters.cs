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
}