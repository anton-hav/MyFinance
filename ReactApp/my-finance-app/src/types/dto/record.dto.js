export default class RecordDto {
  id = null;
  price = null;
  comment = "";
  createdDate = null;
  categoryId = null;
  /**
   * @property {*} recordStatus - the status of the record
   */
  recordStatus = null;

  constructor(id, price, comment, createdDate, categoryId, recordStatus) {
    if (id !== undefined) this.id = id;
    if (price !== undefined) this.price = price;
    if (comment !== undefined) this.comment = comment;
    if (createdDate !== undefined) this.createdDate = createdDate;
    if (categoryId !== undefined) this.categoryId = categoryId;
    if (recordStatus !== undefined) this.recordStatus = recordStatus;
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
      response.categoryId,
      response.status
    );
  }

  /**
   * Mapping from RecordInListForApprovalViewModel to RecordDto.
   * @param {RecordInListForApprovalViewModel} object - object.
   * @returns a new RecordDto object
   */
  static fromRecordInListForApprovalViewModel(object) {
    if (object !== undefined) {
      return new RecordDto(
        object.id,
        object.price,
        object.comment,
        object.createdDate,
        object.category.id,
        object.recordStatus
      );
    }
    return new RecordDto();
  }
}
