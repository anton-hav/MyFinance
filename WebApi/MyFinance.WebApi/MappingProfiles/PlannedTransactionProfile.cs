using AutoMapper;
using MyFinance.Core.DataTransferObjects;
using MyFinance.DataBase.Entities;
using MyFinance.WebApi.Models.PlannedTransactions.Requests;
using MyFinance.WebApi.Models.PlannedTransactions.Responses;

namespace MyFinance.WebApi.MappingProfiles;

/// <summary>
/// Mapper profile for the PlannedTransaction
/// </summary>
public class PlannedTransactionProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public PlannedTransactionProfile()
    {
        CreateMap<PlannedTransaction, PlannedTransactionDto>();
        CreateMap<PlannedTransactionDto, PlannedTransaction>();

        CreateMap<AddPlannedTransactionRequestModel, PlannedTransactionDto>();

        CreateMap<PlannedTransactionDto, PlannedTransactionResponseModel>();
    }
}