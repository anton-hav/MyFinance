/**
 * The view model for RecordsListViewItem component.
 */
export default class RecordInRecordsListViewModel {
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

  constructor(id, price, comment, createdDate, category) {
    if (id !== undefined) this.id = id;
    if (price !== undefined) this.price = price;
    if (comment !== undefined) this.comment = comment;
    if (createdDate !== undefined) this.createdDate = createdDate;
    if (category !== undefined) this.category = category;
  }

  /**
   * Mapping from RecordDto to RecordInRecordsListViewModel.
   * @param {RecordDto} dto - record as a RecordDto object.
   * @returns a new RecordInRecordsListViewModel object
   */
  static fromRecordDto(dto) {
    return new RecordInRecordsListViewModel(
      dto.id,
      dto.price,
      dto.comment,
      dto.createdDate
    );
  }
}
