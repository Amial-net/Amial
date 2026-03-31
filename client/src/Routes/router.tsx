import App from "../App";
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
import MessagePage from "../Pages/MessagePage";

import ActivityPage from "../Pages/ActivitiesPage";
import MissionPage from "../Pages/MissionPage"
import SignupPage from "../Pages/SignupPage"

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
        path: "mission",
        element: <MissionPage />,
      },
      {
        path: "activities",
        element: <ActivityPage />,
       
      },
      { path : "signup",
        element: <SignupPage />
      },
    ],
  },
];

export default routes;
