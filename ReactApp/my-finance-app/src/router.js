import { createBrowserRouter } from "./imports/navigation.imports";
// Import pages
import App from "./App";
import ErrorPage from "./pages/Error.page";
import HomePage from "./pages/Home.page";
import AboutPage from "./pages/About.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import CabinetPage from "./pages/Cabinet.page";
// Import utils

// Import guards
import RootGuard from "./guards/root.guard";

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
            element: <HomePage />,
          },
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/about",
            element: <AboutPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/dashboard",
            element: (
              <RootGuard component=<CabinetPage /> authorised={["User"]} />
            ),
          },
        ],
      },
    ],
  },
]);

export { router as Router };
