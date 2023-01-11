namespace MyFinance.Core.Exceptions;

/// <summary>
///     The exception that is throw manually when conflict
///     with creating or update of the existing record in the storage.
/// </summary>
public class ConflictWithExistingRecordException : ArgumentException
{
    private const string BaseErrorMessage = "The same entry already exists in the storage.";

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="message">an error message as a string</param>
    /// <param name="paramName">the name of the parameter that caused the exception</param>
    public ConflictWithExistingRecordException(string? message, string? paramName)
        : base($"{BaseErrorMessage} {message}", paramName)
    {
    }
}