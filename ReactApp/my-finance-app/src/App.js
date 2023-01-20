import { ThemeProvider, createTheme } from "./imports/ui.imports";

import "./App.css";
import Layout from "./pages/Layout";

// Custom global theme that changes font size for headings.
const scaleRate = 0.5;
const theme = createTheme({
  typography: {
    h1: {
      fontSize: `${6.0 * scaleRate}rem`,
    },
    h2: {
      fontSize: `${3.75 * scaleRate}rem`,
    },
    h3: {
      fontSize: `${3.0 * scaleRate}rem`,
    },
    h4: {
      fontSize: `${2.15 * scaleRate}rem`,
    },
    h5: {
      fontSize: `${1.5 * scaleRate}rem`,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
