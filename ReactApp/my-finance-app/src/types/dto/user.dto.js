export default class UserDto {
  id = "";
  email = "";
  password = "";

  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  /**
   * Mapping from api response (as an json) to UserDto.
   * @param {*} response response object as an JSON.
   * @returns a new UserDto instance
   */
  static fromResponse(response) {
    return new UserDto(response.id, response.email, null);
  }
}
