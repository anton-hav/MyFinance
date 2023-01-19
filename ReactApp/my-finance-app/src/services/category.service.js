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

  // READ

  /**
   * Get categories by user id and category type from the API.
   * @param {CategoryTypes} categoryType - an unique identifier of the creator.
   * @returns categories matching the requested user id and category type.
   */
  async getCategoriesByUserIdAndCategoryTypeFromApi(categoryType) {
    let categoriesRequestModel = new CategoryRequestModel(categoryType.value);
    let response = await this._apiService.get(
      this._categoriesEndpoint,
      categoriesRequestModel
    );
    let categories = response.map((cat) => CategoryDto.fromResponse(cat));
    return categories;
  }

  /**
   * Get income categories by user id.
   * @returns income categories for the specified user.
   */
  async getIncomeCategoriesByUserIdFromApi() {
    const categoryType = CategoryTypes.getIncomeType();
    const result = await this.getCategoriesByUserIdAndCategoryTypeFromApi(
      categoryType
    );
    return result;
  }

  /**
   * Get expenses categories by user id.
   * @returns expenses categories for the specified user.
   */
  async getExpensesCategoriesByUserIdFromApi() {
    const categoryType = CategoryTypes.getExpensesType();
    const result = await this.getCategoriesByUserIdAndCategoryTypeFromApi(
      categoryType
    );
    return result;
  }

  // CREATE

  /**
   * Create new category to the database via API.
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

  // UPDATE

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

  // DELETE

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
}
