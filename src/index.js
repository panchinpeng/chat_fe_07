import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import Loading from "./component/loading/loading";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Suspense fallback={<Loading from="Suspense"></Loading>}>
    <RouterProvider router={router}></RouterProvider>
  </Suspense>
  // </React.StrictMode>
);
