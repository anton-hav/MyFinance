using AutoMapper;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
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
                        CategoryId = request.CategoryId
                    }))
            .ForMember(searchParams => searchParams.CreationDateTime,
                opt
                    => opt.MapFrom(request => new CreationDateTimeSearchParameters()
                    {
                        Created = request.CreatedDate
                    }));
    }
}