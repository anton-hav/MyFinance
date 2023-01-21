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
    if (createdDate !== undefined) this.type = createdDate;
    if (categoryId !== undefined) this.type = categoryId;
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
      response.createdDate,
      response.categoryId
    );
  }
}

//   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "price": 0,
//   "comment": "string",
//   "createdDate": "2023-01-21T14:15:00.557Z",
//   "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
