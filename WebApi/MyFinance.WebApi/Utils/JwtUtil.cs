using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;
using MyFinance.WebApi.Models.General.Responses;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace MyFinance.WebApi.Utils;

/// <summary>
/// Service provides utils for JWT
/// </summary>
public class JwtUtilSha256 : IJwtUtil
{
    private readonly IConfiguration _configuration;
    private readonly IRefreshTokenService _refreshTokenService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="configuration">configuration provider as a <see cref="IConfiguration"/></param>
    /// <param name="refreshTokenService">refresh token service as a <see cref="IRefreshTokenService"/></param>
    public JwtUtilSha256(IConfiguration configuration, 
        IRefreshTokenService refreshTokenService)
    {
        _configuration = configuration;
        _refreshTokenService = refreshTokenService;
    }

    /// <inheritdoc />
    public async Task<TokenResponse> GenerateTokenAsync(UserDto dto)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:JwtSecret"]));
        var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        var nowUtc = DateTime.UtcNow;
        var exp = nowUtc.AddMinutes(double.Parse(_configuration["Token:ExpiryMinutes"]))
            .ToUniversalTime();

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Sub, dto.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("D")),
            new Claim(ClaimTypes.NameIdentifier, dto.Id.ToString("D")),
            new Claim(ClaimTypes.Role, dto.Role.Name),
        };

        var jwtToken = new JwtSecurityToken(_configuration["Token:Issuer"],
            _configuration["Token:Issuer"],
            claims,
            expires: exp,
            signingCredentials: credentials);

        var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        
        var refreshTokenValue = Guid.NewGuid();

        await _refreshTokenService.CreateRefreshTokenAsync(refreshTokenValue, dto.Id);
        
        return new TokenResponse()
        {
            AccessToken = accessToken,
            Role = dto.Role.Name,
            TokenExpiration = jwtToken.ValidTo,
            UserId = dto.Id,
            RefreshToken = refreshTokenValue
        };
    }

    /// <inheritdoc />
    public async Task RemoveRefreshTokenAsync(Guid requestRefreshToken)
    {
        await _refreshTokenService.RemoveRefreshTokenAsync(requestRefreshToken);
    }
}