// Import storage providers
import { TokenStorage } from "../storage/token.storage";
// Import custom types and utils
import { environment } from "../environment/environment";

/**
 * JWT interceptor that adds JWT bearer to the header for every request.
 */
export class JwtInterceptor {
  /**
   * Constructor
   * @param {function} fetcher - fetch or wrapped fetch function
   */
  constructor(fetcher) {
    this._tokenStore = new TokenStorage();
    this._apiUrl = environment.apiUrl;
    this._fetcher = fetcher;
  }

  /**
   * Call wrapped fetch function with specified arguments.
   * @param {array} args - request arguments
   * @returns response object
   */
  wrappedFetch = async (args) => {
    this.intercept(args);
    let result = await this._fetcher(...args);
    return result;
  };

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
      // checks if the method is "GET"
      if (params.method === "GET") {
        // creates new headers object and assign to the request
        const requestHeaders = new Headers();
        requestHeaders.append("Authorization", `Bearer ${token.accessToken}`);
        params.headers = requestHeaders;
      } else {
        params.headers.set("Authorization", `Bearer ${token.accessToken}`);
      }
    }
  }
}
