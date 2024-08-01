import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import style from "./index.module.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

function Index() {
  const store = useStore();
  return (
    <>
      <Header></Header>
      <Box component="section" className={style.content}>
        {store.user.login !== undefined && <Outlet />}
        <Footer></Footer>
      </Box>
    </>
  );
}
export default observer(Index);
