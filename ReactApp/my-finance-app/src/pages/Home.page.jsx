// Import third-party libraries
import { Paper, Box, Typography } from "../imports/ui.imports";
import { Link } from "../imports/navigation.imports";
// Import services
import UserService from "../services/user.service";
// Import custom types and utils
import useToken from "../utils/hooks/useToken.hook";
// Import styles
import "./home.page.css";

const _userService = new UserService();

export default function HomePage() {
  const { token } = useToken();

  if (token.accessToken) {
    const validateToken = async () => await _userService.validateToken();
    validateToken();
  }

  return (
    <Box className="home">
      <Paper className="wrapper">
        <Typography variant="h1">Welcom.</Typography>
        <Box className="summary">
          <Typography mb={1}>
            This app allows you to manage and analyze your expenses and income.
          </Typography>
          <Typography mb={2}>
            The application provides the following features:
            <br />
            - create and manage transaction records;
            <br />
            - use default categories;
            <br />
            - create and manage new categories,
            <br />- create and manage scheduled transactions.
          </Typography>
          <Typography>
            To start using the service, <Link to="/login">log in</Link> or{" "}
            <Link to="/register">register</Link> a new account.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
