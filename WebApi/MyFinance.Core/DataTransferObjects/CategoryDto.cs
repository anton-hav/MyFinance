﻿namespace MyFinance.Core.DataTransferObjects;

/// <summary>
///     Data transfer object for the category.
/// </summary>
public class CategoryDto
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
    ///     The unique identifier of the parent category for the current entry.
    /// </summary>
    /// <remarks>
    ///     For the root category the value is null.
    ///     Only one root category per category type is allowed.
    /// </remarks>
    public Guid? ParentCategoryId { get; set; }

    /// <summary>
    ///     Parent category.
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public CategoryDto? ParentCategory { get; set; }

    /// <summary>
    ///     List of child categories
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public List<CategoryDto> Children { get; set; }
}