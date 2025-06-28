import React, { useEffect } from "react";
import PinchZoom from "pinch-zoom-js";
import style from "./zoomImg.module.css";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store/index";
const ZoomImg = () => {
  const store = useStore();
  useEffect(() => {
    let pz;
    if (store.zoomImg.url) {
      pz = new PinchZoom(document.getElementById("zoomImg"));
    }
    return () => {
      pz && pz.destroy();
      pz = null;
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
