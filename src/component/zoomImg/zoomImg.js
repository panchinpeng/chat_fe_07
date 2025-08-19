import React, { useEffect } from "react";
import PinchZoom from "pinch-zoom-js";
import style from "./zoomImg.module.css";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store/index";
const ZoomImg = () => {
  const store = useStore();
  useEffect(() => {
    let pz;
    const handlePopstate = () => {
      store.zoomImg.close();
    };

    if (store.zoomImg.url) {
      // 模擬 push 一個 state，讓返回鍵不會直接離開當前頁面
      if (!window.history.state || !window.history.state.zoomImg) {
        window.history.pushState({ zoomImg: true }, "");
      }
      pz = new PinchZoom(document.getElementById("zoomImg"));
      window.addEventListener("popstate", handlePopstate);
    }
    return () => {
      pz && pz.destroy();
      pz = null;
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [store.zoomImg.url]);
  if (!store.zoomImg.url) {
    return null;
  }
  return (
    <div className={style.zoomWrap} onClick={() => store.zoomImg.close()}>
      <img
        src={store.zoomImg?.url}
        id="zoomImg"
        onClick={(e) => e.stopPropagation()}
        alt="zoom"
      ></img>
    </div>
  );
};

export default observer(ZoomImg);
