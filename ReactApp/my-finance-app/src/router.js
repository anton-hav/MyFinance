import { createBrowserRouter } from "./imports/navigation.imports";
// Import pages
import App from "./App";
import ErrorPage from "./pages/Error.page";
import Home from "./pages/Home.page";
import About from "./pages/About.page";
import Login from "./pages/Login.page";
import Register from "./pages/Register.page";

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
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export { router as Router };
