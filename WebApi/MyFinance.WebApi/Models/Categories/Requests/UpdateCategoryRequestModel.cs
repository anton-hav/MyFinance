﻿using MyFinance.Core;

namespace MyFinance.WebApi.Models.Categories.Requests;

/// <summary>
/// Request model to create or update category
/// </summary>
public class UpdateCategoryRequestModel
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
    ///     (Income = 0, Expenses = 1)
    /// </summary>
    public CategoryType Type { get; set; }

    /// <summary>
    ///     The unique identifier of the parent category for the current entry.
    /// </summary>
    /// <remarks>
    ///     For the root category the value is null.
    ///     Only one root category per category type is allowed.
    /// </remarks>
    public Guid? ParentCategoryId { get; set; }
}