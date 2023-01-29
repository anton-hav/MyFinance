/**
 * The view model for PieChartCategory component.
 * It represents a category with the associated the records count.
 */
export default class CategoryInPieChartViewModel {
  id = null;
  name = "";
  value = null;

  constructor(id, name, value) {
    if (id !== undefined) this.id = id;
    if (name !== undefined) this.name = name;
    if (value !== undefined) this.value = value;
  }

  /**
   * Mapping from CategoryDto to CategoryInPieChartViewModel.
   * @param {CategoryDto} dto - category as a CategoryDto object.
   * @returns a new CategoryInPieChartViewModel object
   */
  static fromCategoryDto(dto) {
    return new CategoryInPieChartViewModel(dto.id, dto.name);
  }
}
