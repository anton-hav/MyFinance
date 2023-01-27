namespace MyFinance.DataBase.Entities;

public interface IBaseEntity
{
    /// <summary>
    ///     An unique identifier
    /// </summary>
    Guid Id { get; set; }
}