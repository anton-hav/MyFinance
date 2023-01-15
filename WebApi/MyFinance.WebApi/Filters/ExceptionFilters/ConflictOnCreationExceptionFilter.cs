using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MyFinance.Core.Exceptions;
using MyFinance.WebApi.Models.General.Responses;
using Serilog;

namespace MyFinance.WebApi.Filters.ExceptionFilters;

/// <summary>
///     Conflict Exception filter.
///     It handles <see cref="ConflictWithExistingRecordException"/> and send response with 409 status code.
/// </summary>
/// <remarks>
///     Use it as an action attribute.
/// </remarks>
public class ConflictOnCreationExceptionFilter : Attribute, IExceptionFilter
{
    /// <inheritdoc />
    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;
        if (ex.GetType() == typeof(ConflictWithExistingRecordException))
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            context.Result = new ConflictObjectResult(new ErrorModel { Message = ex.Message });
            context.ExceptionHandled = true;
        }
    }
}