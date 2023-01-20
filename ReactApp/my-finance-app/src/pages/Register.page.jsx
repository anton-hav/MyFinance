import { useState } from "react";
// Import third party libraries
import { useNavigate } from "../imports/navigation.imports";
// Import custom components
import { Register as RegisterComponent } from "../components/topLevel/index";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import ConflictError from "../types/errors/conflict.error";

const _userService = new UserService();

export default function RegisterPage() {
  const [existingEmails, setExistingEmails] = useState([]);

  const navigate = useNavigate();

  /**
   * Handle submit click event from the register form
   * @param {Object} values - data from the register form
   */
  const handleSubmit = async (values) => {
    try {
      // Try registrate new user
      const result = await _userService.register(
        values.email,
        values.password,
        values.passwordConfirmation,
        values.fullName
      );

      // If registration successful navigate to previous page
      if (result) {
        navigate("/");
      }
    } catch (error) {
      // If registration failed check if user is already exists
      if (error instanceof ConflictError) {
        // add user to existingEmails (to reduce the number of requests to the API)
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
