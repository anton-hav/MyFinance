export default class RecordDto {
  id = null;
  price = null;
  comment = "";
  createdDate = null;
  categoryId = null;

  constructor(id, price, comment, createdDate, categoryId) {
    if (id !== undefined) this.id = id;
    if (price !== undefined) this.price = price;
    if (comment !== undefined) this.comment = comment;
    if (createdDate !== undefined) this.createdDate = createdDate;
    if (categoryId !== undefined) this.categoryId = categoryId;
  }

  /**
   * Mapping from api response (as an json) to RecordDto.
   * @param {*} response - response object as an JSON.
   * @returns a new RecordDto object
   */
  static fromResponse(response) {
    return new RecordDto(
      response.id,
      response.price,
      response.comment,
      response.createdDate,
      response.categoryId
    );
  }
}
