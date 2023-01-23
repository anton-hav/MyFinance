import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";
import CategoryTypes from "../../../utils/categoryTypes";

/**
 * Represents a records parameters for requesting the records count through API.
 * Don't use this class for generate url search string for URL.
 */
export default class RecordsCountRequestModel extends UrlSearchParameters {
  /**
   * @property {string} categoryId - an unique identifier of the category.
   */
  categoryId = null;
  /**
   * @property {string} categoryType - category type of the records category.
   */
  categoryType = null;

  constructor(categoryId, categoryType) {
    super();
    if (categoryId !== undefined) {
      this.categoryId = categoryId;
    }
    if (categoryType !== undefined) {
      this.categoryType = categoryType;
    }
  }

  // ------------------------Motivation---------------------------------
  // | The object that wraps the parameters will allow you             |
  // | to extend the functionality in the future without changing      |
  // | the signature of the service methods.                           |
  // -------------------------------------------------------------------
  /**
   * Mapping from object to RecordsCountRequestModel.
   * @param {Object} objcet - object that wrap parameters.
   * @returns a new RecordsCountRequestModel object
   */
  static fromObject(object) {
    if (object !== undefined) {
      return new RecordsCountRequestModel(
        object.categoryId,
        object.categoryType !== undefined
          ? CategoryTypes.isTypeForAll(object.categoryType)
            ? null
            : object.categoryType.value
          : null
      );
    }
    return new RecordsCountRequestModel();
  }
}
