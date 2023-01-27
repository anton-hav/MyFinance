using AutoMapper;
using MyFinance.Business.SearchModelImplementations;
using MyFinance.Business.SearchParametersImplementations;
using MyFinance.WebApi.Models.PlannedTransactions.Requests;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
///     Mapper profile for PlannedTransactionsSearchModel
/// </summary>
public class PlannedTransactionsSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public PlannedTransactionsSearchModelProfile()
    {
        CreateMap<GetPlannedTransactionRequestModel, PlannedTransactionsSearchModel>()
            .ForMember(searchParams => searchParams.Category,
                opt
                    => opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId,
                        CategoryType = request.CategoryType
                    }));
    }
}