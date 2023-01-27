using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace MyFinance.Core;

/// <summary>
/// Status of the record
/// </summary>
[JsonConverter(typeof(StringEnumConverter))]
public enum RecordStatus
{
    Approved = 0,
    Planned = 1,
    Rejected = 2,
}