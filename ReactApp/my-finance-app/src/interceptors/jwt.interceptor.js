// Import storage providers
import { TokenStorage } from "../storage/token.storage";
// Import custom types and utils
import { environment } from "../environment/environment";

/**
 * Request interceptor
 */
export class JwtInterceptor {
  constructor() {
    this._tokenStore = new TokenStorage();
    this._apiUrl = environment.apiUrl;
  }

  /**
   * Intercept request and adds the JWT bearer to the headers of the request.
   * @param {array} args - fetch parameters
   */
  intercept(args) {
    let [url, params] = args;

    // gets token from the store
    const token = this._tokenStore.get();

    // checks if the api url id allowed
    const isApiUrl = url.href.startsWith(this._apiUrl);

    if (isApiUrl && token?.accessToken) {
      params.headers.set("Authorization", `Bearer ${token.accessToken}`);
    }
  }
}
