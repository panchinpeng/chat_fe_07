import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routers/privateRoute";
import Logout from "./routers/logout/logout";
import Error from "./routers/error/error";
import History from "./routers/history/history";

const AddFriend = React.lazy(() => import("./routers/addFriend/addFriend"));
const Portal = React.lazy(() => import("./routers/portal/portal"));
const Signup = React.lazy(() => import("./routers/signup/signup"));
const Login = React.lazy(() => import("./routers/login/login"));
const Post = React.lazy(() => import("./routers/post/post"));
const Info = React.lazy(() => import("./routers/info/info"));
const Online = React.lazy(() => import("./routers/online/online"));
const Chatroom = React.lazy(() => import("./routers/chatroom/chatroom"));
const Article = React.lazy(() => import("./routers/article/article"));
const FriendMain = React.lazy(() => import("./routers/friendMain/friendMain"));
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
        path: "online/:friend",
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
        path: "article",
        element: <Article></Article>,
      },
      {
        path: "addFriend",
        element: <AddFriend></AddFriend>,
      },
      {
        path: "friendMain/:user",
        element: <FriendMain></FriendMain>,
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
    element: <PrivateRoutes forceToLogin={true}></PrivateRoutes>,
    children: [
      {
        path: "/history",
        element: <History></History>,
      },
      {
        path: "",
        element: <Portal></Portal>,
      },
    ],
  },
]);

export default router;
