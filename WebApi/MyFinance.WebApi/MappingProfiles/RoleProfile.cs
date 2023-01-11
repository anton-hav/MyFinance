using AutoMapper;
using MyFinance.Core.DataTransferObjects;
using MyFinance.DataBase.Entities;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
/// Mapper profile for Role
/// </summary>
public class RoleProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public RoleProfile()
    {
        CreateMap<Role, RoleDto>();
        CreateMap<RoleDto, Role>();
    }
}