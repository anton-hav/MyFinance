using AutoMapper;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.WebApi.Models.RecordsCount.Request;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
///     Mapper profile for RecordsCountSearchModel
/// </summary>
public class RecordsCountSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public RecordsCountSearchModelProfile()
    {
        CreateMap<GetRecordsCountRequestModel, RecordsCountSearchModel>()
            .ForMember(searchParams => searchParams.Category,
                opt =>
                    opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId,
                        CategoryType = request.CategoryType
                    }));
    }
}