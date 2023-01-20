using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchParametersImplementations;

/// <summary>
/// Represent the search parameters related to the user.
/// </summary>
public class UserSearchParameters : IUserSearchParameters
{
    /// <inheritdoc />
    public Guid? UserId { get; set; }
}