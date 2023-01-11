using Microsoft.AspNetCore.Authorization;

namespace MyFinance.WebApi.Policies;

/// <summary>
/// The class contains criteria for evaluating
/// </summary>
public class PermissionRequirement : IAuthorizationRequirement
{

    /// <summary>
    /// Criteria for valuating
    /// </summary>
    public string Permission { get; }

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="permission">criteria as a string</param>
    public PermissionRequirement(string permission)
    {
        Permission = permission;
    }
}