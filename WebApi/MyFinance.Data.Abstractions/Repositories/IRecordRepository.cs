using MyFinance.DataBase.Entities;

namespace MyFinance.Data.Abstractions.Repositories;

/// <summary>
/// A repository that provides extra methods to interact with records it the storage.
/// </summary>
/// <remarks>
/// Created as an example.
/// </remarks>
public interface IRecordRepository : IRepository<Record>
{
    /// <summary>
    /// Checks if the record exists in the storage by Id.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid" /></param>
    /// <returns>A boolean</returns>
    Task<bool> IsRecordExistByIdAsync(Guid id);

    // ...
    // more Record-specific methods here.
    // ...
}