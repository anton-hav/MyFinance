using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace MyFinance.Core;

/// <summary>
/// Category type.
/// </summary>
[JsonConverter(typeof(StringEnumConverter))]
public enum CategoryType
{
    Income = 0,
    Expenses = 1,
}