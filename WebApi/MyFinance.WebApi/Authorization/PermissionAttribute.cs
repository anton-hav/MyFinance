using Microsoft.AspNetCore.Authorization;

namespace MyFinance.WebApi.Policies;

/// <summary>
/// Custom authorize attribute for policy permission.
/// </summary>
/// <remarks>
/// Provides access based on specified requirements. Eligible requirements: AdminOnly, UserOnly
/// </remarks>
public class PermissionAttribute : AuthorizeAttribute
{
    /// <summary>
    /// Prefix for the policy name.
    /// </summary>
    private const string POLICY_PREFIX = "Permission";

    /// <summary>
    /// Policy requirement.
    /// </summary>
    /// <remarks>
    /// Contains policy rules and used as the part of the policy name.
    /// </remarks>
    public string? RequiredPermission
    {
        get => Policy?.Substring(POLICY_PREFIX.Length);
        set => Policy = $"{POLICY_PREFIX}{value}";
    }

    /// <inheritdoc />
    public PermissionAttribute(string requiredPermission)
    {
        RequiredPermission = requiredPermission;
    }
}