// Import storage providers
import { TokenStorage } from "../storage/token.storage";
// Import custom types and utils
import { environment } from "../environment/environment";
// Import services
import UserService from "../services/user.service";

/**
 * Response interceptor
 */
export class AuthErrorInterceptor {
  constructor(fetcher) {
    this._tokenStore = new TokenStorage();
    this._apiUrl = environment.apiUrl;
    this._userService = new UserService();
    this._fetcher = fetcher;
  }

  wrappedFetch = async (args) => {
    let result = await this._fetcher(...args);
    this.intercept(result, args);
    return result;
  };

  /**
   * Handle response.
   * @param {*} response - response from the API server
   */
  intercept(response, args) {
    const getTokenByRefreshToken = async (refreshToken) => {
      return await this._userService.getTokenByRefreshToken(refreshToken);
    };

    const repeatRequest = async () => {
      response = await this._fetcher(...args);
    };

    if ([401, 403].includes(response.status)) {
      const token = this._tokenStore.get();
      if (token.refreshToken) {
        const newToken = getTokenByRefreshToken(token.refreshToken);
        this._tokenStore.set(newToken);
        repeatRequest();
      }
    }

    return response;
  }
}
