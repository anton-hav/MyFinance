import { useEffect } from "react";
// Import third party libraries
import { useNavigate } from "../imports/navigation.imports";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken.hook";

const _userService = new UserService();

export default function AuthGuard(props) {
  const { component, role } = props;
  const { token } = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Validate token and redirect to login page
     * if token isn't valid or role is the role does not meet the requirements.
     */
    const validateToken = async () => {
      let isTokenValid = await _userService.validateToken(token.accessToken);
      if (isTokenValid) {
        if (!role.includes(token.role)) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    // Validate token if token exists and contains a access token.
    // Redirect to login page if token doesn't exist or access token is null or empty.
    if (token.accessToken) {
      validateToken(token);
    } else {
      navigate("/login");
    }
    // Role and the navigate added to dependencies array only to escape the warning messages.
    // They never change at runtime.
  }, [token, role, navigate]);

  return component;
}
