// Import third party libraries
import { Box, Toolbar, Typography, Container } from "../../imports/ui.imports";
// Import custom components
import { PageNavBarItem } from "./appBarItems/PageNavBarItem.component";

import AccountTools from "./appBarItems/AccountBarItem.component";

import "./topAppBar.component.css";

export default function TopAppBar(props) {
  const { title, pages } = props;

  return (
    <Container maxWidth="true">
      <Toolbar className="app-bar" disableGutters>
        <Typography className="title" variant="h6" noWrap component="a" href="">
          {title}
        </Typography>

        <Box className="pages-nav">
          <PageNavBarItem pages={pages} />
        </Box>

        <Box className="account-tools">
          <AccountTools />
        </Box>
      </Toolbar>
    </Container>
  );
}
