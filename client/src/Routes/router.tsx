import App from "../App"
import LandingPage from "../Pages/LandingPage";
const routes = [
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <LandingPage/>
                )
            },
        ]
    }
]

export default routes;