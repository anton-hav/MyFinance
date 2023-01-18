export default class CategoryDto {
  id = null;
  name = "";
  type = null;

  constructor(id, name, categoryType) {
    if (id !== undefined) this.id = id;
    if (name !== undefined) this.name = name;
    if (categoryType !== undefined) this.categoryType = categoryType;
  }

  /**
   * Deep clone
   * @returns clone of the current object
   */
  clone() {
    let id = this.id;
    let name = this.name;
    let type = this.type;
    return new CategoryDto(id, name, type);
  }

  /**
   * Mapping from api response (as an json) to CategoryDto.
   * @param {*} response - response object as an JSON.
   * @returns a new CategoryDto object
   */
  static fromResponse(response) {
    return new CategoryDto(response.id, response.name, response.type);
  }
}
