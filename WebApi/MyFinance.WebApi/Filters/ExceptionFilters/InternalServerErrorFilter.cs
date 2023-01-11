using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Serilog;

namespace MyFinance.WebApi.Filters.ExceptionFilters;

/// <summary>
///     Root Exception filter.
///     It handles all unhandled exceptions and send response with 500 status code.
/// </summary>
/// <remarks>
///     Use it as an controller attribute.
/// </remarks>
public class InternalServerErrorFilter : Attribute, IExceptionFilter
{
    /// <inheritdoc />
    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;
        Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
        context.Result = new StatusCodeResult(500);
        context.ExceptionHandled = true;
    }
}