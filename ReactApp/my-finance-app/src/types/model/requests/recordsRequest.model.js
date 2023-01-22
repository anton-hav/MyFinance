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

  constructor(createdDate, categoryId) {
    super();
    if (createdDate !== undefined) {
      this.createdDate = createdDate;
    }
    if (categoryId !== undefined) {
      this.categoryId = categoryId;
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
      return new RecordsRequestModel(object.createdDate, object.categoryId);
    }
    return new RecordsRequestModel();
  }
}
