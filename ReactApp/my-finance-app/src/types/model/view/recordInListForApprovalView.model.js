/**
 * The view model for TransactionListForApprovalItem component.
 * It represents a record with the associated category object.
 */
export default class RecordInListForApprovalViewModel {
  /**
   * @param {string} id - the unique identifier
   */
  id = null;
  /**
   * @param {number} price - the amount of the transaction record
   */
  price = null;
  /**
   * @param {string} comment - the comment
   */
  comment = "";
  /**
   * @param {string} createdDate - the date when the transaction was created
   */
  createdDate = null;
  /**
   * @param {CategoryDto} category - the category
   */
  category = null;
  /**
   * @property {*} recordStatus - the status of the record
   */
  recordStatus = null;

  constructor(id, price, comment, createdDate, category, recordStatus) {
    if (id !== undefined) this.id = id;
    if (price !== undefined) this.price = price;
    if (comment !== undefined) this.comment = comment;
    if (createdDate !== undefined) this.createdDate = createdDate;
    if (category !== undefined) this.category = category;
    if (recordStatus !== undefined) this.recordStatus = recordStatus;
  }

  /**
   * Mapping from RecordDto to RecordInListForApprovalViewModel.
   * @param {RecordDto} dto - record as a RecordDto object.
   * @returns a new RecordInListForApprovalViewModel object
   */
  static fromRecordDto(dto) {
    return new RecordInListForApprovalViewModel(
      dto.id,
      dto.price,
      dto.comment,
      dto.createdDate,
      dto.category,
      dto.recordStatus
    );
  }
}
