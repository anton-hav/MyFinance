import { useState } from "react";
// Import third party libraries
import { useNavigate } from "../imports/navigation.imports";
// Import custom components
import { Login as LoginComponent } from "../components/login/Login.component";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import TokenDto from "../types/dto/token.dto";
import useToken from "../utils/hooks/useToken.hook";

const _userService = new UserService();

export default function Login() {
  const { setToken } = useToken();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await _userService.login(email, password);
    if (accessToken instanceof TokenDto) {
      setToken(accessToken);
      navigate(-1);
    }
  };

  /**
   * Handle a click on create new account button.
   */
  const handleGoToRegister = () => navigate("/register");

  return (
    <>
      <LoginComponent
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        onGoToRegisterClick={handleGoToRegister}
      />
    </>
  );
}
