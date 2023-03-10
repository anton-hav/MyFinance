import { useState } from "react";
// Import third party libraries
import { useNavigate } from "../imports/navigation.imports";
// Import custom components
import { Login as LoginComponent } from "../components/topLevel/index";
// Import services
import UserService from "../services/user.service";

const _userService = new UserService();

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await _userService.login(email, password);
    if (result) {
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
