﻿using MyFinance.Core.Abstractions.SearchModels;
using MyFinance.Core.Abstractions.SearchParameters;

namespace MyFinance.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve records from the storage.
/// </summary>
public class RecordSearchModel : IRecordSearchModel
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public ICreationDateTimeSearchParameters CreationDateTime { get; set; }

    /// <inheritdoc />
    public IUserSearchParameters User { get; set; }
}