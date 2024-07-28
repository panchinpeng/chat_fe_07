import { createBrowserRouter } from "react-router-dom";
import Login from "./routers/login/login";
import Online from "./routers/online/online";
import Portal from "./routers/portal/portal";
import PrivateRoutes from "./routers/privateRoute";
import Member from "./routers/member/member";
import Signup from "./routers/signup/signup";
import Info from "./routers/info/info";
const router = createBrowserRouter([
  {
    path: "/member",
    element: <PrivateRoutes forceToLogin={true}></PrivateRoutes>,
    children: [
      {
        path: "",
        element: <Member />,
      },
      {
        path: "online",
        element: <Online />,
      },
      {
        path: "info",
        element: <Info />,
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
