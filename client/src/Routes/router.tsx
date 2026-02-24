import App from "../App";
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
import MessagePage from "../Pages/MessagePage";
import MissionPage from "../Pages/MissionPage"

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
      {
        path : "mission",
        element: <MissionPage />,
      },
    ],
  },
];

export default routes;