import { useEffect } from "react";
// Import third party libraries
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Link,
} from "../../../imports/ui.imports";
import { useFormik, yup } from "../../../imports/formBuilder.import";

import "./register.component.css";

export function Register(props) {
  const { existingEmails, handleSubmit, onGoToLoginClick } = props;

  // Form validation schema configuration provided by yup.
  const validationSchema = yup.object({
    fullName: yup
      .string("Enter your full name")
      .max(100, "Full name should be less than 100 characters"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
      .test("existing", "Email is already exist.", function (value) {
        return !existingEmails.includes(value);
      }),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    passwordConfirmation: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
      .test("passwords-match", "Password must match", function (value) {
        return this.parent.password === value;
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      fullName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Effect called when existingEmails is changed.
  // It is necessary to validate the form after receiving a response from the server.
  // Will be called the first time the component is rendered.
  // Will be called every time if the entered email exists in the database
  // and is not already in existingEmails.
  useEffect(() => {
    formik.validateForm();
  }, [existingEmails]);

  return (
    <Box className="register">
      <Paper>
        <Box className="paper">
          <Typography variant="h1">Create account</Typography>

          <form onSubmit={formik.handleSubmit}>
            <Box className="form">
              <TextField
                className="text-field"
                fullWidth
                id="full-name"
                name="fullName"
                label="Your name"
                placeholder="Enter your first and last name"
                type="text"
                variant="standard"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                className="text-field"
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                className="text-field"
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="standard"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextField
                className="text-field"
                fullWidth
                id="password-confirmation"
                name="passwordConfirmation"
                label="Password confirmation"
                type="password"
                variant="standard"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                error={
                  formik.touched.passwordConfirmation &&
                  Boolean(formik.errors.passwordConfirmation)
                }
                helperText={
                  formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                }
              />

              <Box className="button">
                <Button type="submit">Submit</Button>
              </Box>
            </Box>
          </form>
        </Box>
        <Divider variant="middle" />
        <Typography className="footer-text" variant="body2">
          Already have an account?{" "}
          <Link component="button" variant="body2" onClick={onGoToLoginClick}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
