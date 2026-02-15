import App from "../App"
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
const routes = [
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <LandingPage/>
                ),
            },
            {    
                path: "\login",
                element:(
                    <LoginPage/>
                )
            },
        ]
    }
]

export default routes;