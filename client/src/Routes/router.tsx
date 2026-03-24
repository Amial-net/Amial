import App from "../App";
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
import MessagePage from "../Pages/MessagePage";
import MissionPage from "../Pages/MissionPage";
import SignupPage from "../Pages/SignupPage";
import ExplorePage from "../Pages/ExplorePage";

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
        path: "explore",
        element: <ExplorePage />,
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
      {
        path : "signup",
        element: <SignupPage />,
      },
    ],
  },
];

export default routes;