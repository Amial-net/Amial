import App from "../App";
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
import MessagePage from "../Pages/MessagePage";

const routes = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "messages",
        element: <MessagePage />,
      },
    ],
  },
];

export default routes;
