using MyFinance.Core.DataTransferObjects;
using MyFinance.WebApi.Models.General.Responses;

namespace MyFinance.WebApi.Utils;

/// <summary>
/// Signature of the service provides utils for JWT
/// </summary>
public interface IJwtUtil
{
    /// <summary>
    /// Generate token for the current user.
    /// </summary>
    /// <param name="dto">user as a <see cref="UserDto"/></param>
    /// <returns>newly token as a <see cref="TokenResponse"/></returns>
    Task<TokenResponse> GenerateTokenAsync(UserDto dto);

    /// <summary>
    /// Remove refresh token
    /// </summary>
    /// <param name="requestRefreshToken"></param>
    /// <returns>Task</returns>
    Task RemoveRefreshTokenAsync(Guid requestRefreshToken);
}