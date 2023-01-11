using AutoMapper;
using MyFinance.Core.DataTransferObjects;
using MyFinance.DataBase.Entities;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
/// Mapper profile for RefreshToken
/// </summary>
public class RefreshTokenProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public RefreshTokenProfile()
    {
        CreateMap<RefreshToken, RefreshTokenDto>();
        CreateMap<RefreshTokenDto, RefreshToken>();
    }
}