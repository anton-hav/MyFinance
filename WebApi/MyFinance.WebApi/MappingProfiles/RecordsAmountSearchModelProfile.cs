﻿using AutoMapper;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.WebApi.Models.RecordsCount.Request;
using MyFinance.WebApi.Models.RecordsSum.Request;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
///     Mapper profile for RecordsAmountSearchModel
/// </summary>
public class RecordsAmountSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public RecordsAmountSearchModelProfile()
    {
        CreateMap<GetRecordsAmountRequestModel, RecordsAmountSearchModel>()
            .ForMember(searchParams => searchParams.Category,
                opt =>
                    opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId,
                        CategoryType = request.CategoryType
                    }));
    }
}