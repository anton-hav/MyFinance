// Import third-party utils
import { queryString } from "../imports/utils.import";
// Import interceptors
import { JwtInterceptor } from "../interceptors/jwt.interceptor";
// Import custom types and utils
import { environment } from "../environment/environment";
import Logger from "../utils/logger";
import UnauthorizedError from "../types/errors/unauthorized.error";
import BadRequestError from "../types/errors/bad-request.error";
import ConflictError from "../types/errors/conflict.error";

const jwtInterceptor = new JwtInterceptor();
const originalFetch = fetch;
fetch = (...args) =>
  (async (args) => {
    jwtInterceptor.intercept(args);
    var result = await originalFetch(...args);
    // intercept response here
    return result;
  })(args);

export default class ApiService {
  constructor() {
    this._logger = new Logger();
  }

  _getFullUrl(url) {
    return environment.apiUrl + url;
  }

  /**
   * GET request with parameters to the API
   * @param {string} url - endpoint name
   * @param {*} parameters - request parameters as Object
   * @returns
   */
  async get(endpoint, parameters = {}) {
    let fullUrl = new URL(`${this._getFullUrl(endpoint)}`);

    if (Object.keys(parameters).length > 0) {
      fullUrl += "?" + queryString.stringify(parameters);
    }

    let response = await fetch(fullUrl, {
      method: "GET",
    });
    if (response.status === 400) {
      throw new BadRequestError();
    }
    return response.json();
  }

  /**
   * GET request by id to the API
   * @param {string} url - endpoint name
   * @param {*} id - id of the endpoint resource
   * @returns
   */
  async getById(url, id) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    let response = await fetch(fullUrl, {
      method: "GET",
    });
    return response.json();
  }

  async post(url, data) {
    let fullUrl = new URL(`${this._getFullUrl(url)}`);

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    let response = await fetch(fullUrl, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
    if (response.status === 400) {
      throw new BadRequestError();
    } else if (response.status === 401) {
      throw new UnauthorizedError();
    } else if (response.status === 409) {
      throw new ConflictError();
    }
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
  }

  put() {
    throw new Error("Not implemented");
  }

  async patch(url, data, id) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    let response = await fetch(fullUrl, {
      method: "PATCH",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(url, id) {
    let fullUrl = new URL(`${this._getFullUrl(url)}/${id}`);

    let response = await fetch(fullUrl, {
      method: "DELETE",
    });
    if (response.ok) return true;

    throw new Error("Failed to delete");
  }
}
