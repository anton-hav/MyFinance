using MyFinance.Core;

namespace MyFinance.DataBase.Entities;

/// <summary>
/// Cash flow record
/// </summary>
public class Record : IBaseEntity
{
    /// <summary>
    /// An unique identifier
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Amount of record
    /// </summary>
    public double Price { get; set; }

    /// <summary>
    /// Comment of record
    /// </summary>
    public string? Comment { get; set; }

    /// <summary>
    /// Date of creation
    /// </summary>
    public DateTime CreatedDate { get; set;}

    /// <summary>
    /// Status of the record
    /// </summary>
    public RecordStatus Status { get; set; }

    /// <summary>
    /// A category unique identifier
    /// </summary>
    public Guid CategoryId { get; set; }

    /// <summary>
    ///     Category.
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public Category Category { get; set; }
}