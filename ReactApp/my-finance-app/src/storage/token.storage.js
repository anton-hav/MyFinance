// import custom types and utils
import TokenDto from "../types/dto/token.dto";

/**
 * Class that provides API for intaractions with token in the local storage.
 */
export class TokenStorage {
  static storageName = "token";

  /**
   * Get the token from the local storage.
   * @returns token that stored in the local storage or newly empty token as a TokenDto object.
   */
  get() {
    const tokenString = localStorage.getItem(TokenStorage.storageName);
    let token = TokenDto.fromResponse(JSON.parse(tokenString));
    return token ? token : new TokenDto();
  }

  /**
   * Set the token in the local storage.
   * @param {TokenDto} token - set token in the local storage
   */
  set(token) {
    if (token instanceof TokenDto) {
      localStorage.setItem(TokenStorage.storageName, JSON.stringify(token));
    }
  }

  /**
   * Remove the token from the local storage.
   */
  delete() {
    localStorage.removeItem(TokenStorage.storageName);
  }
}
