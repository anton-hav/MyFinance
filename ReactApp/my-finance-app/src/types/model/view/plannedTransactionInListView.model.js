/**
 * The view model for PlannedTransactionListViewItem component.
 * It represents a planned transaction with the associated category object.
 */
export default class PlannedTransactionInListViewModel {
  /**
   * @param {string} id - the unique identifier
   */
  id = null;
  /**
   * @param {number} price - the amount of the transaction record
   */
  price = null;
  /**
   * @param {string} cron - the cron
   */
  cron = "";
  /**
   * @param {CategoryDto} category - the category
   */
  category = null;

  constructor(id, price, cron, category) {
    if (id !== undefined) this.id = id;
    if (price !== undefined) this.price = price;
    if (cron !== undefined) this.cron = cron;
    if (category !== undefined) this.category = category;
  }

  /**
   * Mapping from PlannedTransactionDto to PlannedTransactionInListViewModel.
   * @param {PlannedTransactionDto} dto - planned transaction as a PlannedTransactionDto object.
   * @returns a new PlannedTransactionInListViewModel object
   */
  static fromPlannedTransactionDto(dto) {
    return new PlannedTransactionInListViewModel(dto.id, dto.price, dto.cron);
  }
}
