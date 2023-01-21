// Import services
import ApiService from "./api.service";
// Import custom types and utils
import CategoryDto from "../types/dto/category.dto";
import CategoryRequestModel from "../types/model/requests/categoryRequest.model";
import { environment } from "../environment/environment";
import CategoryTypes from "../utils/categoryTypes";

export default class CategoryService {
  constructor() {
    this._categoriesEndpoint = environment.categoriesEndpoint;
    this._apiService = new ApiService();
  }

  //#region READ

  /**
   * Get categories by category type from the API.
   * @param {CategoryTypes} categoryType - an unique identifier of the creator.
   * @returns categories matching the requested category type.
   */
  async getCategoriesByCategoryTypeFromApi(categoryType) {
    let categoriesRequestModel = new CategoryRequestModel(categoryType.value);
    let response = await this._apiService.get(
      this._categoriesEndpoint,
      categoriesRequestModel
    );
    let categories = response.map((cat) => CategoryDto.fromResponse(cat));
    return categories;
  }

  /**
   * Get income categories.
   * @returns income categories.
   */
  async getIncomeCategoriesFromApi() {
    const categoryType = CategoryTypes.getIncomeType();
    const result = await this.getCategoriesByCategoryTypeFromApi(categoryType);
    return result;
  }

  /**
   * Get expenses categories.
   * @returns expenses categories.
   */
  async getExpensesCategoriesFromApi() {
    const categoryType = CategoryTypes.getExpensesType();
    const result = await this.getCategoriesByCategoryTypeFromApi(categoryType);
    return result;
  }

  //#endregion READ

  //#region CREATE

  /**
   * Create new category in the database via API.
   * @param {string} categoryName - category name
   * @param {number} categoryType - number that represent category type (see CategoryTypes)
   * @return a newly category.
   */
  async createNewCategory(categoryName, categoryType) {
    let response = await this._apiService.post(this._categoriesEndpoint, {
      name: categoryName,
      type: categoryType,
    });
    let category = CategoryDto.fromResponse(response);
    return category;
  }

  //#endregion CREATE

  //#region UPDATE

  /**
   * Update the category trough the API
   * @param {*} category - an access token
   * @returns a boolean (true if record successfully updated)
   */
  async updateCategory(category) {
    let response = await this._apiService.patch(
      this._categoriesEndpoint,
      category,
      category.id
    );
    let result = CategoryDto.fromResponse(response);
    return result instanceof CategoryDto;
  }

  //#endregion UPDATE

  //#region DELETE

  /**
   * Remove a category from the database via API.
   * @param {string} categoryId - an unique identifier of the category.
   * @returns a boolean(true if record successfully removed)
   */
  async removeCategory(categoryId) {
    let response = await this._apiService.delete(
      this._categoriesEndpoint,
      categoryId
    );
    return response;
  }

  //#endregion DELETE
}
