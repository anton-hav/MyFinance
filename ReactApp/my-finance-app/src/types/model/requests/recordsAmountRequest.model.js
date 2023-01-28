import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";
import CategoryTypes from "../../../utils/categoryTypes";

/**
 * Represents a records parameters for requesting the amount of records through API.
 * Don't use this class for generate url search string for URL.
 */
export default class RecordsAmountRequestModel extends UrlSearchParameters {
  /**
   * @property {string} categoryId - an unique identifier of the category.
   */
  categoryId = null;
  /**
   * @property {string} categoryType - category type of the records category.
   */
  categoryType = null;
  /**
   * @property {*} recordStatus - the status of the record
   */
  recordStatus = null;

  constructor(categoryId, categoryType, recordStatus) {
    super();
    if (categoryId !== undefined) {
      this.categoryId = categoryId;
    }
    if (categoryType !== undefined) {
      this.categoryType = categoryType;
    }
    if (recordStatus !== undefined) {
      this.recordStatus = recordStatus;
    }
  }

  // ------------------------Motivation---------------------------------
  // | The object that wraps the parameters will allow you             |
  // | to extend the functionality in the future without changing      |
  // | the signature of the service methods.                           |
  // -------------------------------------------------------------------
  /**
   * Mapping from object to RecordsAmountRequestModel.
   * @param {Object} objcet - object that wrap parameters.
   * @returns a new RecordsAmountRequestModel object
   */
  static fromObject(object) {
    if (object !== undefined) {
      return new RecordsAmountRequestModel(
        object.categoryId,
        object.categoryType !== undefined
          ? CategoryTypes.isTypeForAll(object.categoryType)
            ? null
            : object.categoryType.value
          : null,
        object.recordStatus
      );
    }
    return new RecordsAmountRequestModel();
  }
}
