import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import style from "./index.module.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

export default function Index() {
  return (
    <>
      <Header></Header>
      <Box component="section" sx={{ p: 2 }} className={style.content}>
        <Outlet />
        <Footer></Footer>
      </Box>
    </>
  );
}
