import DashBoard from "../pages/admin/dashBoard";
import SignUp from "../pages/admin/signUp";
import Login from "../pages/admin/login";
import Post from "../pages/admin/Post";

export const adminRoutes = [
    {
        path: '/admin',
        children: [
            {
              path: "sign-up",
              element: <SignUp />,
            },
            {
              path: "login",
              element: <Login/>
            },
            {
              path: "dashboard",
              element: <DashBoard/>
            },
            {
              path: `post/:postId`,
              element: <Post/>
          }
          ],
    }
]