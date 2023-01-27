import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents a records parameters for requesting records through API.
 * Don't use this class for generate url search string for URL.
 */
export default class UpdateRecordsRequestModel extends UrlSearchParameters {
  id = null;
  price = null;
  comment = "";
  createdDate = null;
  categoryId = null;
  status = null;

  constructor(id, price, comment, createdDate, categoryId, status) {
    super();
    if (id !== undefined) this.id = id;
    if (price !== undefined) this.price = price;
    if (comment !== undefined) this.comment = comment;
    if (createdDate !== undefined) this.createdDate = createdDate;
    if (categoryId !== undefined) this.categoryId = categoryId;
    if (status !== undefined) this.status = status;
  }

  /**
   * Mapping from RecordDto to UpdateRecordsRequestModel.
   * @param {RecordDto} dto - record.
   * @returns a new UpdateRecordsRequestModel object
   */
  static fromRecordDto(dto) {
    return new UpdateRecordsRequestModel(
      dto.id,
      dto.price,
      dto.comment,
      dto.createdDate,
      dto.categoryId,
      dto.recordStatus
    );
  }
}
