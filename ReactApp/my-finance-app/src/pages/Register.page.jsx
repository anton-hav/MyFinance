import { useState } from "react";
// Import third party libraries
import { useNavigate } from "../imports/navigation.imports";
// Import custom components
import { Register as RegisterComponent } from "../components/register/Register.component";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import TokenDto from "../types/dto/token.dto";
import ConflictError from "../types/errors/conflict.error";
import useToken from "../utils/hooks/useToken.hook";

const _userService = new UserService();

export default function Register() {
  const { setToken } = useToken();
  const [existingEmails, setExistingEmails] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const accessToken = await _userService.register(
        values.email,
        values.password,
        values.passwordConfirmation,
        values.fullName
      );

      if (accessToken instanceof TokenDto) {
        setToken(accessToken);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ConflictError) {
        let existing = existingEmails.slice();
        existing.push(values.email);
        setExistingEmails(existing);
      }
    }
  };

  /**
   * Handle a click on Sign In button.
   */
  const handleGoToLoginClick = () => navigate("/login");

  return (
    <>
      <RegisterComponent
        existingEmails={existingEmails}
        handleSubmit={handleSubmit}
        onGoToLoginClick={handleGoToLoginClick}
      />
    </>
  );
}
