// Import storage providers
import { TokenStorage } from "../storage/token.storage";
// Import custom types and utils
import { environment } from "../environment/environment";
import TokenDto from "../types/dto/token.dto";

/**
 * Authontication interceptor that refresh token and replay request
 * when response has status code 401 or 403.
 */
export class AuthErrorInterceptor {
  /**
   * Constructor
   * @param {function} fetcher - fetch or wrapped fetch function
   * @param {*} apiService - api service instance
   */
  constructor(fetcher, apiService) {
    this._tokenStore = new TokenStorage();
    this._apiUrl = environment.apiUrl;
    this._tokenEndpoints = environment.tokenEndpoints;
    this._fetcher = fetcher;
    this._apiService = apiService;
  }

  /**
   * Call wrapped fetch function with specified arguments.
   * @param {array} args - request arguments
   * @returns response object
   */
  wrappedFetch = async (args) => {
    let result = await this._fetcher(args);
    await this.intercept(result, args);
    return result;
  };

  /**
   * Intercept response object.
   * It refresh token and replay request when response has status code 401 or 403.
   * @param {*} response - response from the wrapped fetch function.
   * @param {*} args - request arguments
   * @returns response object
   */
  intercept = async (response, args) => {
    const getTokenByRefreshToken = async (refreshToken) => {
      let result = await this._apiService.post(
        this._tokenEndpoints.refreshToken,
        { refreshToken: refreshToken }
      );
      let token = TokenDto.fromResponse(result);
      return token;
      // return await this._userService.getTokenByRefreshToken(refreshToken);
    };

    const repeatRequest = async (args) => {
      let result = await this._fetcher(args);
      return result;
    };

    if ([401, 403].includes(response.status)) {
      const token = this._tokenStore.get();
      if (token.refreshToken) {
        const newToken = await getTokenByRefreshToken(token.refreshToken);
        if (newToken.accessToken) {
          this._tokenStore.set(newToken);
          response = await repeatRequest(args);
        }
      }
    }

    return response;
  };
}
