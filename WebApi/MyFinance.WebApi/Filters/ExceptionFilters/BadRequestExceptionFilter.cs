using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MyFinance.WebApi.Models.General.Responses;
using Serilog;

namespace MyFinance.WebApi.Filters.ExceptionFilters;

/// <summary>
///     BadRequest Exception filter.
///     It handles ArgumentException or ArgumentNullException
///     and send response with 400 status code.
/// </summary>
/// <remarks>
///     Use it as an action attribute.
/// </remarks>
public class BadRequestExceptionFilter : Attribute, IExceptionFilter
{
    /// <inheritdoc />
    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;
        if (ex.GetType() == typeof(ArgumentException)
            || ex.GetType() == typeof(ArgumentNullException))
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            context.Result = new BadRequestObjectResult(new ErrorModel { Message = ex.Message });
            context.ExceptionHandled = true;
        }
    }
}