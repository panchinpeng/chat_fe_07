import { createBrowserRouter } from "react-router-dom";
import Login from "./routers/login/login";
import Online from "./routers/online/online";
import Intro from "./routers/intro/intro";
import PrivateRoutes from "./routers/privateRoute";
import Member from "./routers/member/member";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes></PrivateRoutes>,
    children: [
      {
        path: "",
        element: <Intro />,
      },
      {
        path: "online",
        element: <Online />,
      },
      {
        path: "member",
        element: <Member />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
