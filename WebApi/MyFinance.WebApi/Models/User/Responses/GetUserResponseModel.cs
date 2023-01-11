namespace MyFinance.WebApi.Models.User.Responses;

/// <summary>
/// Response model for user
/// </summary>
public class GetUserResponseModel
{
    /// <summary>
    /// User email
    /// </summary>
    public string Email { get; set; }
    /// <summary>
    /// AN unique identifier of user role
    /// </summary>
    public Guid RoleId { get; set; }
}