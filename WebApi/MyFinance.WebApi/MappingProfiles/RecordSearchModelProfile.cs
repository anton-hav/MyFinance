using AutoMapper;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.Core;
using MyFinance.WebApi.Models.Records.Requests;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
///     Mapper profile for RecordSearchModelProfile
/// </summary>
public class RecordSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public RecordSearchModelProfile()
    {
        CreateMap<GetRecordsRequestModel, RecordSearchModel>()
            .ForMember(searchParams => searchParams.Category,
                opt
                    => opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId,
                        CategoryType = request.CategoryType,
                    }))
            .ForMember(searchParams => searchParams.CreationDateTime,
                opt
                    => opt.MapFrom(request => new CreationDateTimeSearchParameters()
                    {
                        Created = request.CreatedDate,
                        DateFrom = request.DateFrom,
                        DateTo = request.DateTo,
                    }));
    }
}