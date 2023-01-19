import { Box, LinearProgress } from "../imports/ui.imports";
import { Outlet, useNavigation } from "../imports/navigation.imports";
// Import custom components
import TopAppBar from "../components/topLevel/topAppBar/TopAppBar.component";

import "./layout.css";

const pages = ["home", "about", "dashboard"];
const title = "My Finance";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <div className="layout">
      <header className="header">
        <TopAppBar title={title} pages={pages} />

        {navigation.state === "loading" ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : null}
      </header>
      <div className="body">
        <div className={navigation.state === "loading" ? "loading" : ""}>
          <Outlet />
        </div>
      </div>
      <footer className="footer">
        <div className="copy">The {title} App 2022 &copy;</div>
      </footer>
    </div>
  );
}
