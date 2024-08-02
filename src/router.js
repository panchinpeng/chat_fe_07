import { createBrowserRouter } from "react-router-dom";
import Login from "./routers/login/login";
import Online from "./routers/online/online";
import Portal from "./routers/portal/portal";
import PrivateRoutes from "./routers/privateRoute";
import Signup from "./routers/signup/signup";
import Info from "./routers/info/info";
import Post from "./routers/post/post";
import Chatroom from "./routers/chatroom/chatroom";
import Logout from "./routers/logout/logout";
import AddFriend from "./routers/addFriend/addFriend";
import Error from "./routers/error/error";
const router = createBrowserRouter([
  {
    path: "/member",
    element: <PrivateRoutes forceToLogin={true}></PrivateRoutes>,
    children: [
      {
        path: "chatroom",
        element: <Chatroom></Chatroom>,
      },
      {
        path: "online",
        element: <Online />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "post",
        element: <Post />,
      },
      {
        path: "addFriend",
        element: <AddFriend></AddFriend>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/error",
    element: <Error></Error>,
  },
  {
    path: "/",
    element: <PrivateRoutes forceToLogin={false}></PrivateRoutes>,
    children: [
      {
        path: "",
        element: <Portal />,
      },
    ],
  },
]);

export default router;
