import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from "../../../imports/ui.imports";

import "./login.component.css";

export function Login(props) {
  const { setEmail, setPassword, handleSubmit, onGoToRegisterClick } = props;

  return (
    <Box className="login">
      <Paper>
        <Box className="paper">
          <Typography variant="h5">Hello</Typography>
          <Typography variant="body2">
            Sign in or{" "}
            <Link
              component="button"
              variant="body2"
              onClick={onGoToRegisterClick}
            >
              create an account
            </Link>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="form">
              <Box className="email">
                <TextField
                  className="text-field"
                  required
                  id="standard-required"
                  label="Email"
                  defaultValue=""
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box className="password">
                <TextField
                  className="text-field"
                  required
                  id="password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box className="button">
                <Button type="submit">Login</Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
