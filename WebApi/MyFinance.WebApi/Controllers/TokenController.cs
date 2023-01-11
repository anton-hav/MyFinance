using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFinance.Core.Abstractions.Services;
using MyFinance.WebApi.Filters.ExceptionFilters;
using MyFinance.WebApi.Models.General.Responses;
using MyFinance.WebApi.Models.Token.Requests;
using MyFinance.WebApi.Utils;
using Serilog;

namespace MyFinance.WebApi.Controllers;

/// <summary>
///     Controller that provides API for authorization methods.
/// </summary>
/// <remarks>This controller is not resource oriented (not a RESTful).</remarks>
[Route("api/[controller]")]
[ApiController]
[TypeFilter(typeof(InternalServerErrorFilter))]
public class TokenController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtUtil _jwtUtil;

    /// <summary>
    ///     Constructor
    /// </summary>
    /// <param name="userService"></param>
    /// <param name="jwtUtil"></param>
    public TokenController(IUserService userService, IJwtUtil jwtUtil)
    {
        _userService = userService;
        _jwtUtil = jwtUtil;
    }

    /// <summary>
    ///     Create new access token for the login data model
    /// </summary>
    /// <param name="request">login model</param>
    /// <returns>An access token for an authorized user.</returns>
    /// <response code="200">Returns the access token for the authorized user</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateJwtToken([FromBody] LoginUserRequestModel request)
    {
        var user = await _userService.GetUserByEmailAsync(request.Email);

        var isPassCorrect = await _userService.CheckUserPasswordAsync(request.Email, request.Password);

        if (!isPassCorrect)
        {
            var message = "Password is incorrect.";
            Log.Information(message);
            return BadRequest(new ErrorModel { Message = message });
        }

        var response = await _jwtUtil.GenerateTokenAsync(user);
        return Ok(response);
    }


    /// <summary>
    ///     Create new token by refresh token.
    /// </summary>
    /// <param name="request">a refresh token value</param>
    /// <returns>new access token for authorized user</returns>
    /// <response code="200">Returns the access token for the authorized user</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [Route("Refresh")]
    [HttpPost]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestModel request)
    {
        var user = await _userService.GetUserByRefreshTokenAsync(request.RefreshToken);
        var response = await _jwtUtil.GenerateTokenAsync(user);
        await _jwtUtil.RemoveRefreshTokenAsync(request.RefreshToken);
        return Ok(response);
    }

    /// <summary>
    ///     Revoke access token by the refresh token value
    /// </summary>
    /// <param name="request">a refresh token value</param>
    /// <returns>The Ok status</returns>
    /// <response code="200">an empty</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [Route("Revoke")]
    [HttpPost]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> RevokeToken([FromBody] RefreshTokenRequestModel request)
    {
        await _jwtUtil.RemoveRefreshTokenAsync(request.RefreshToken);
        return Ok();
    }

    /// <summary>
    ///     Validate access token.
    /// </summary>
    /// <returns>true if the token is valid</returns>
    /// <response code="200">Returns true if the token is valid</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [Route("Validate")]
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public IActionResult ValidateToken()
    {
        return Ok(true);
    }
}