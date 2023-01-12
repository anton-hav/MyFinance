import { Toolbar, Typography } from "../../imports/ui.imports";
// Import custom components
import { PageNavBarItem } from "./appBarItems/PageNavBarItem.component";

// import AccountTools from "./account-tools.component";

export default function TopAppBar(props) {
  const { title, pages } = props;

  return (
    <Toolbar disableGutters>
      <Typography className="title" variant="h6" noWrap component="a" href="">
        {title}
      </Typography>
      <PageNavBarItem pages={pages} />

      {/* <Box sx={{ flexGrow: 0 }}>
            <AccountTools />
          </Box> */}
    </Toolbar>
  );
}
