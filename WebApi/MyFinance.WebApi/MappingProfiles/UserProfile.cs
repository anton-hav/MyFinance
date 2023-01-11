using AutoMapper;
using MyFinance.Core.DataTransferObjects;
using MyFinance.DataBase.Entities;
using MyFinance.WebApi.Models.User.Requests;
using MyFinance.WebApi.Models.User.Responses;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
/// Mapper profile for User
/// </summary>
public class UserProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public UserProfile()
    {
        CreateMap<User, UserDto>();

        CreateMap<UserDto, User>()
            .ForMember(ent => ent.Id,
                opt
                    => opt.MapFrom(dto => Guid.NewGuid()));

        CreateMap<RegisterUserRequestModel, UserDto>();

        CreateMap<UserDto, GetUserResponseModel>();
    }
}