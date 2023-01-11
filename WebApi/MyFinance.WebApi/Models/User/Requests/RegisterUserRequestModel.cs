﻿namespace MyFinance.WebApi.Models.User.Requests;

/// <summary>
/// Register model
/// </summary>
public class RegisterUserRequestModel
{
    /// <summary>
    /// User email
    /// </summary>
    public string Email { get; set; }
    /// <summary>
    /// User password
    /// </summary>
    public string Password { get; set; }
    /// <summary>
    /// Confirmation of the user password
    /// </summary>
    public string PasswordConfirmation { get; set; }
}