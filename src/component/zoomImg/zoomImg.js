import React, { useEffect } from "react";
import PinchZoom from "pinch-zoom-js";
import style from "./zoomImg.module.css";
export default function ZoomImg({ url, closeZoom }) {
  useEffect(() => {
    let pz;
    if (url) {
      pz = new PinchZoom(document.getElementById(url));
    }
    return () => {
      pz && pz.destroy();
      pz = null;
    };
  }, [url]);
  if (!url) {
    return null;
  }
  return (
    <div className={style.zoomWrap} onClick={closeZoom}>
      <img
        src={url}
        id={url}
        onClick={(e) => e.stopPropagation()}
        alt="zoom"
      ></img>
    </div>
  );
}
