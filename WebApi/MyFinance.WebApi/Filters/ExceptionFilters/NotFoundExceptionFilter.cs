using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MyFinance.WebApi.Models.General.Responses;
using Serilog;

namespace MyFinance.WebApi.Filters.ExceptionFilters;

/// <summary>
///     NotFound Exception filter.
///     It handles ArgumentException and send response with 404 status code.
/// </summary>
/// <remarks>
///     Use it as an action attribute.
/// </remarks>
public class NotFoundExceptionFilter : Attribute, IExceptionFilter
{
    /// <inheritdoc />
    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;
        if (ex.GetType() == typeof(ArgumentException))
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            context.Result = new BadRequestObjectResult(new ErrorModel { Message = ex.Message });
            context.ExceptionHandled = true;
        }
    }
}