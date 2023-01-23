/**
 * The view model for CategorySection component.
 * It represents a category with the associated the records count.
 */
export default class CategoryInCategorySectionViewModel {
  id = null;
  name = "";
  type = null;
  recordsCount = null;

  constructor(id, name, categoryType, recordsCount) {
    if (id !== undefined) this.id = id;
    if (name !== undefined) this.name = name;
    if (categoryType !== undefined) this.type = categoryType;
    if (recordsCount !== undefined) this.recordsCount = recordsCount;
  }

  /**
   * Mapping from CategoryDto to CategoryInCategorySectionViewModel.
   * @param {CategoryDto} dto - category as a CategoryDto object.
   * @returns a new CategoryInCategorySectionViewModel object
   */
  static fromCategoryDto(response) {
    return new CategoryInCategorySectionViewModel(
      response.id,
      response.name,
      response.type
    );
  }
}
