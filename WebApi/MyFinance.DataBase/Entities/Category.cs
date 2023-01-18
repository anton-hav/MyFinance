using MyFinance.Core;

namespace MyFinance.DataBase.Entities;

/// <summary>
///     Category
/// </summary>
public class Category : IBaseEntity
{
    /// <summary>
    ///     An unique identifier
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    ///     Category name
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    ///     Category type.
    /// </summary>
    public CategoryType Type { get; set; }

    /// <summary>
    ///     The unique identifier of the creator.
    /// </summary>
    public Guid UserId { get; set; }
    
    /// <summary>
    ///     Category creator.
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public User User { get; set; }
}