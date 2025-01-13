import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import style from "./index.module.css";

import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import Trends from "../../component/trends/trends";
import Loading from "../../component/loading/loading";

function Index() {
  const store = useStore();
  const location = useLocation();
  useEffect(() => {
    document.getElementById("interactionWrap").scrollTop = 0;
  }, [location.pathname]);

  return (
    <>
      <Box component="section" className={style.content} id="interactionWrap">
        {store.user.login !== undefined && <Outlet />}
      </Box>
      <Trends></Trends>
      <Loading></Loading>
    </>
  );
}
export default observer(Index);
