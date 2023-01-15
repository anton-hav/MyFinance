namespace MyFinance.Core.Abstractions.Services;

public interface IRoleService
{
    #region READ

    /// <summary>
    ///     Gets the role Id for a default user role.
    /// </summary>
    /// <returns>The Task&lt;Result&gt; where Result is GUID</returns>
    Task<Guid> GetRoleIdForDefaultRoleAsync();

    /// <summary>
    ///     Gets the role Id for an admin role.
    /// </summary>
    /// <returns>The Task&lt;Result&gt; where Result is GUID</returns>
    Task<Guid> GetRoleIdForAdminRoleAsync();

    /// <summary>
    ///     Gets the role name for a default user role.
    /// </summary>
    /// <returns>The role name as a string</returns>
    string GetDefaultRoleNameForUser();

    /// <summary>
    ///     Gets the role name for a default admin role.
    /// </summary>
    /// <returns>The role name as a string</returns>
    string GetDefaultRoleNameForAdmin();

    #endregion READ
}