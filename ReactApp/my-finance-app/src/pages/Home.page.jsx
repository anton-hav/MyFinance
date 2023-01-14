import useToken from "../utils/hooks/useToken.hook";
import UserService from "../services/user.service";

const _userService = new UserService();

export default function Home() {
  const { token } = useToken();

  if (token.accessToken) {
    const validateToken = async () => await _userService.validateToken();
    validateToken();
  }

  return <div>Welcome</div>;
}
