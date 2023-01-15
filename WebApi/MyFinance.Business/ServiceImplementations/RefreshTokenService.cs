using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyFinance.Core.Abstractions.Services;
using MyFinance.Data.Abstractions;
using MyFinance.DataBase.Entities;

namespace MyFinance.Business.ServiceImplementations;

public class RefreshTokenService : IRefreshTokenService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public RefreshTokenService(IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    #region CREATE

    /// <inheritdoc />
    public async Task<int> CreateRefreshTokenAsync(Guid tokenValue, Guid userId)
    {
        var rt = new RefreshToken
        {
            Id = Guid.NewGuid(),
            Token = tokenValue,
            UserId = userId
        };

        await _unitOfWork.RefreshToken.AddAsync(rt);
        var result = await _unitOfWork.Commit();
        return result;
    }

    #endregion CREATE

    #region DELETE

    /// <inheritdoc />
    public async Task<int> RemoveRefreshTokenAsync(Guid tokenValue)
    {
        var token = await _unitOfWork.RefreshToken
            .Get()
            .FirstOrDefaultAsync(token => token.Token.Equals(tokenValue));

        if (token != null)
            _unitOfWork.RefreshToken.Remove(token);

        return await _unitOfWork.Commit();
    }

    #endregion DELETE
}