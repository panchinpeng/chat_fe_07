import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import Loading from "./component/loading/loading";
import Alert from "./component/alert/alert";
import Zooming from "./component/zoomImg/zoomImg";

const root = ReactDOM.createRoot(document.getElementById("root"));
// 解決當觀看commits時，點選頭貼僅入其他頁，按上一頁後，會出現錯誤Uncaught ResizeObserver loop completed with undelivered notifications.
const ro = window.ResizeObserver;
window.ResizeObserver = class extends ro {
  constructor(callback) {
    super((entries, observer) => {
      requestAnimationFrame(() => callback(entries, observer));
    });
  }
};

root.render(
  // <React.StrictMode>
  <Suspense fallback={<Loading from="Suspense"></Loading>}>
    <RouterProvider router={router}></RouterProvider>
    <Alert />
    <Loading />
    <Zooming />
  </Suspense>
  // </React.StrictMode>
);
