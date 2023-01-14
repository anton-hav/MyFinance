// import custom types and utils
import { TokenStorage } from "../../storage/token.storage";

/**
 * Custom React Hook for storing access token.
 * The hook encapsulates the logic of interaction with the store.
 * @returns an object that contains the token and setToken
 */
export default function useToken() {
  const store = new TokenStorage();

  /**
   * Get token from the store.
   * @returns token that stored in the store or newly empty token as a TokenDto object.
   */
  const getToken = () => {
    const token = store.get();
    return token;
  };

  /**
   * Save token in the store.
   * @param {TokenDto} userToken - token as a TokenDto object
   */
  const saveToken = (userToken) => {
    store.set(userToken);
  };

  return {
    setToken: saveToken,
    token: getToken(),
  };
}
