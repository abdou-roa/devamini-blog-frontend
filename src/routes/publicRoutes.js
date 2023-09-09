import Home from "../pages/Home"
import About from "../pages/About"

export const publicRoutes =[
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/about',
        element: <About/>
    },
]