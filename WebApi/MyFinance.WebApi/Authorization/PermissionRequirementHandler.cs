using System.Security.Authentication;
using Microsoft.AspNetCore.Authorization;
using MyFinance.Core.Abstractions.IdentityManagers;
using MyFinance.Core.Abstractions.Services;
using Serilog;

namespace MyFinance.WebApi.Policies;

/// <summary>
///     A processor for evaluating policy requirements.
/// </summary>
/// <remarks>
///     It is used because the role names are stored in the configuration file and can be changed.
/// </remarks>
public class PermissionRequirementHandler : AuthorizationHandler<PermissionRequirement>
{
    private readonly IRoleService _roleService;
    private readonly IUserManager _userManager;

    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="roleService"></param>
    /// <param name="userManager"></param>
    public PermissionRequirementHandler(IRoleService roleService,
        IUserManager userManager)
    {
        _roleService = roleService;
        _userManager = userManager;
    }

    /// <inheritdoc />
    /// <param name="context">authorization context as a <see cref="AuthorizationHandlerContext" /></param>
    /// <param name="requirement">permission requirement as a <see cref="PermissionRequirement" /></param>
    /// <returns>Task</returns>
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        PermissionRequirement requirement)
    {
        try
        {
            if (requirement.Permission == "AdminOnly")
            {
                var isAdmin = _userManager.IsAdmin();
                if (isAdmin) context.Succeed(requirement);
            }
            else if (requirement.Permission == "UserOnly")
            {
                var isUser = _userManager.IsUser();
                if (isUser) context.Succeed(requirement);
            }
        }
        catch (AuthenticationException ex)
        {
            Log.Information($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
        }

        return Task.CompletedTask;
    }
}