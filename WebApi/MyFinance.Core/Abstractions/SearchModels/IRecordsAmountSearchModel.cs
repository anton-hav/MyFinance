﻿using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Core.Abstractions.SearchModels;

/// <summary>
///     Model for searching the amount og records in the storage.
/// </summary>
public interface IRecordsAmountSearchModel
{
    /// <summary>
    ///     Category search parameters.
    /// </summary>
    ICategorySearchParameters Category { get; set; }

    /// <summary>
    ///     User search parameters
    /// </summary>
    IUserSearchParameters User { get; set; }
}