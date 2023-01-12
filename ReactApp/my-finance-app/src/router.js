import { createBrowserRouter } from "./imports/navigation.imports";
// Import pages
import App from "./App";
import ErrorPage from "./pages/Error.page";
import Home from "./pages/Home.page";
import About from "./pages/About.page";

// Import utils

// Import guards

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <div>Something goes wrong.</div>,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
        ],
      },
    ],
  },
]);

export { router as Router };
