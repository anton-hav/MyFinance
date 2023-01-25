export default class PlannedTransactionDto {
  id = null;
  price = null;
  cron = "";
  categoryId = null;

  constructor(id, price, cron, categoryId) {
    if (id !== undefined) this.id = id;
    if (price !== undefined) this.price = price;
    if (cron !== undefined) this.cron = cron;
    if (categoryId !== undefined) this.categoryId = categoryId;
  }

  /**
   * Mapping from api response (as an json) to PlannedTransactionDto.
   * @param {*} response - response object as an JSON.
   * @returns a new PlannedTransactionDto object
   */
  static fromResponse(response) {
    return new PlannedTransactionDto(
      response.id,
      response.price,
      response.crone,
      response.categoryId
    );
  }
}
