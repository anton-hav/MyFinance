import UrlSearchParameters from "../../url-parameters/url-parameters.parameters";

/**
 * Represents a category parameters for requesting category through API.
 * Don't use this class for generate url search string for URL.
 */
export default class CategoryRequestModel extends UrlSearchParameters {
  /**
   * @property {number} type - type of category.
   */
  type = "";

  constructor(categoryType) {
    super();
    if (categoryType !== undefined) {
      this.type = categoryType;
    }
  }
}
