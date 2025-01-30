import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import style from "./index.module.css";

import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import Trends from "../../component/trends/trends";
import Loading from "../../component/loading/loading";
import Portal from "./../portal/portal";

function Index() {
  const store = useStore();
  const location = useLocation();

  return (
    <>
      <Box component="section" className={style.content} id="interactionWrap">
        {store.user.login !== undefined && <Outlet />}

        {store.user.login !== undefined && (
          <div
            className={`${style.portalPage} ${location.pathname === "/" ? style.showPortal : ""}`}
          >
            <Portal></Portal>
          </div>
        )}
      </Box>
      <Trends></Trends>
      <Loading></Loading>
    </>
  );
}
export default observer(Index);
