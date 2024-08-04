import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routers/privateRoute";
import Logout from "./routers/logout/logout";
import Error from "./routers/error/error";

const AddFriend = React.lazy(() => import("./routers/addFriend/addFriend"));
const Portal = React.lazy(() => import("./routers/portal/portal"));
const Signup = React.lazy(() => import("./routers/signup/signup"));
const Login = React.lazy(() => import("./routers/login/login"));
const Post = React.lazy(() => import("./routers/post/post"));
const Info = React.lazy(() => import("./routers/info/info"));
const Online = React.lazy(() => import("./routers/online/online"));
const Chatroom = React.lazy(() => import("./routers/chatroom/chatroom"));
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
        element: <Online></Online>,
      },
      {
        path: "info",
        element: <Info></Info>,
      },
      {
        path: "post",
        element: <Post></Post>,
      },
      {
        path: "addFriend",
        element: <AddFriend></AddFriend>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
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
        element: <Portal></Portal>,
      },
    ],
  },
]);

export default router;
