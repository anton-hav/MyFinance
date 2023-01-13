// import custom types and utils
import TokenDto from "../../types/dto/token.dto";

/**
 * Custom React Hook for storing access token.
 * The hook encapsulates the logic of interaction with the local storage store.
 * @returns an object that contains the token and setToken
 */
export default function useToken() {
  /**
   * Get token from the local storage.
   * @returns token that stored in the local storage or newly empty token as a TokenDto object.
   */
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    let userToken = TokenDto.fromResponse(JSON.parse(tokenString));

    return userToken ? userToken : new TokenDto();
  };

  /**
   * Save token in the local storage
   * @param {*} userToken - token as a TokenDto object
   */
  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
  };

  return {
    setToken: saveToken,
    token: getToken(),
  };
}
