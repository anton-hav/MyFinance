using AutoMapper;
using MyFinance.Core.DataTransferObjects;
using MyFinance.DataBase.Entities;
using MyFinance.WebApi.Models.Records.Requests;
using MyFinance.WebApi.Models.Records.Responses;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
/// Mapper profile for the Record
/// </summary>
public class RecordProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public RecordProfile()
    {
        CreateMap<Record, RecordDto>();
        CreateMap<RecordDto, Record>();

        CreateMap<AddRecordRequestModel, RecordDto>();
        CreateMap<UpdateRecordRequestModel, RecordDto>();

        CreateMap<RecordDto, RecordResponseModel>();
    }
}