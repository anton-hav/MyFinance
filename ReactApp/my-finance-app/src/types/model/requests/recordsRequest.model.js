import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents a records parameters for requesting records through API.
 * Don't use this class for generate url search string for URL.
 */
export default class RecordsRequestModel extends UrlSearchParameters {
  /**
   * @property {Date} createdDate - date of creation.
   */
  createdDate = null;
  /**
   * @property {string} categoryId - an unique identifier of the category.
   */
  categoryId = null;
  /**
   * @property {string} dateFrom -
   */
  dateFrom = null;
  /**
   * @property {string} dateTo -
   */
  dateTo = null;

  constructor(createdDate, categoryId, dateFrom, dateTo) {
    super();
    if (createdDate !== undefined) {
      this.createdDate = createdDate;
    }
    if (categoryId !== undefined) {
      this.categoryId = categoryId;
    }
    if (dateFrom !== undefined) {
      this.dateFrom = dateFrom;
    }
    if (dateTo !== undefined) {
      this.dateTo = dateTo;
    }
  }

  // ------------------------Motivation---------------------------------
  // | The object that wraps the parameters will allow you             |
  // | to extend the functionality in the future without changing      |
  // | the signature of the service methods.                           |
  // -------------------------------------------------------------------
  /**
   * Mapping from object to RecordsRequestModel.
   * @param {Object} objcet - object that wrap parameters.
   * @returns a new RecordsRequestModel object
   */
  static fromObject(object) {
    if (object !== undefined) {
      return new RecordsRequestModel(
        object.createdDate,
        object.categoryId,
        object.dateFrom,
        object.dateTo
      );
    }
    return new RecordsRequestModel();
  }
}
