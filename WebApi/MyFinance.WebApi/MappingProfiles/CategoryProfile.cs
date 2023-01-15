using AutoMapper;
using MyFinance.Core.DataTransferObjects;
using MyFinance.DataBase.Entities;
using MyFinance.WebApi.Models.Categories.Requests;
using MyFinance.WebApi.Models.Categories.Responses;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
/// Mapper profile for Category
/// </summary>
public class CategoryProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public CategoryProfile()
    {
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryDto, Category>();

        CreateMap<AddCategoryRequestModel, CategoryDto>();
        CreateMap<UpdateCategoryRequestModel, CategoryDto>();

        CreateMap<CategoryDto, CategoryResponseModel>();
    }
}