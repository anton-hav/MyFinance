using Cronos;
using Serilog;

namespace MyFinance.WebApi.Utils;

/// <summary>
///     Helper that provides methods for interacts with cron expressions.
/// </summary>
public static class CronValidator
{
    /// <summary>
    ///     Checks if the string contains a cron expression.
    /// </summary>
    /// <param name="cron">cron expression as a string</param>
    /// <returns>A boolean</returns>
    public static bool IsCronValid(string cron)
    {
        try
        {
            var cronExpression = CronExpression.Parse(cron);

            return true;
        }
        catch (CronFormatException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return false;
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            throw;
        }
    }
}