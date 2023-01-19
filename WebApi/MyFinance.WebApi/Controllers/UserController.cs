using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Core.DataTransferObjects;
using MyFinance.Core.Exceptions;
using MyFinance.WebApi.Authorization;
using MyFinance.WebApi.Filters.ExceptionFilters;
using MyFinance.WebApi.Models.General.Responses;
using MyFinance.WebApi.Models.User.Requests;
using MyFinance.WebApi.Models.User.Responses;
using MyFinance.WebApi.Policies;
using MyFinance.WebApi.Utils;

namespace MyFinance.WebApi.Controllers;

/// <summary>
///     Controller that provides API endpoints for the User resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
[TypeFilter(typeof(InternalServerErrorFilter))]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IRoleService _roleService;
    private readonly IMapper _mapper;
    private readonly IJwtUtil _jwtUtil;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="userService"></param>
    /// <param name="roleService"></param>
    /// <param name="mapper"></param>
    /// <param name="jwtUtil"></param>
    public UserController(IUserService userService,
        IRoleService roleService,
        IMapper mapper,
        IJwtUtil jwtUtil)
    {
        _userService = userService;
        _roleService = roleService;
        _mapper = mapper;
        _jwtUtil = jwtUtil;
    }

    /// <summary>
    ///     Get user information with specified id from the storage.
    /// </summary>
    /// <param name="id">an user unique identifier as a <see cref="Guid" /></param>
    /// <returns>An user with specified Id</returns>
    /// <response code="200">Returns an user corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [Permission("AdminOnly")]
    [TypeFilter(typeof(NotFoundExceptionFilter))]
    [ProducesResponseType(typeof(GetUserResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var item = await _userService.GetUserByIdAsync(id);
        var response = _mapper.Map<GetUserResponseModel>(item);
        return Ok(response);
    }


    /// <summary>
    ///     Register new user
    /// </summary>
    /// <param name="request">new user model</param>
    /// <returns>Access token for newly user</returns>
    /// <response code="200">Returns access token for the newly created user</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">The same entry already exists in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [TypeFilter(typeof(ConflictOnCreationExceptionFilter))]
    [TypeFilter(typeof(BadRequestExceptionFilter))]
    [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Create([FromBody] RegisterUserRequestModel request)
    {
        var userRoleId = await _roleService.GetRoleIdForDefaultRoleAsync();
        var userDto = _mapper.Map<UserDto>(request);
        var userWithSameEmailExists = await _userService.IsUserExistsAsync(request.Email);

        if (userWithSameEmailExists)
            throw new ConflictWithExistingRecordException("", nameof(request));

        if (userDto == null
            || Guid.Empty.Equals(userRoleId)
            || !request.Password.Equals(request.PasswordConfirmation))
            throw new ArgumentException("Some register data is incorrect.", nameof(request));

        userDto.RoleId = userRoleId;
        var result = await _userService.RegisterUserAsync(userDto);

        var userInDbDto = await _userService.GetUserByEmailAsync(userDto.Email);
        var response = await _jwtUtil.GenerateTokenAsync(userInDbDto);
        return Ok(response);
    }
}