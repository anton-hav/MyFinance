import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";
import CategoryTypes from "../../../utils/categoryTypes";

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
   * @property {string} dateFrom - start of the interval of the record creation period
   */
  dateFrom = null;
  /**
   * @property {string} dateTo - end of the interval of the record creation period
   */
  dateTo = null;
  /**
   * @property {string} categoryType - category type of the record category.
   */
  categoryType = null;

  constructor(createdDate, categoryId, dateFrom, dateTo, categoryType) {
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
        object.dateTo,
        CategoryTypes.isTypeForAll(object.categoryType)
          ? null
          : object.categoryType.value
      );
    }
    return new RecordsRequestModel();
  }
}
