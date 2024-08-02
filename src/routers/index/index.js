import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import style from "./index.module.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

function Index() {
  const store = useStore();
  const myRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: myRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      highlightColor: 0x1976d2,
      midtoneColor: 0x1976d2,
      baseColor: 0xfff8f8,
      blurFactor: 0.24,
      speed: 0.0,
      zoom: 0.1,
      THREE: THREE,
    });
    window.vantaEffect = vantaEffect;

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <>
      <Header></Header>
      <Box component="section" className={style.content}>
        {store.user.login !== undefined && <Outlet />}
        <Footer></Footer>
      </Box>
      <div id="bg-animate" className={style.bgAnimate} ref={myRef}></div>
    </>
  );
}
export default observer(Index);
