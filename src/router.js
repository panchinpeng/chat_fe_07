import {createBrowserRouter} from "react-router-dom"
import Chat from "./routers/chat/chat"
import Login from "./routers/login/login"
import Online from "./routers/online/online"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat></Chat>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/online",
    element: <Online></Online>
  }
])

export default router