// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken.hook";

const _userService = new UserService();

export default function HomePage() {
  const { token } = useToken();

  if (token.accessToken) {
    const validateToken = async () => await _userService.validateToken();
    validateToken();
  }

  return <div>Welcome</div>;
}
