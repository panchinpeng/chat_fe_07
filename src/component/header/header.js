import { useState } from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import style from "./header.module.css";
import MenuRight from "../menuRight/menuRight";
import CuAvatar from "./../avatar/avatar";

// store
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
import logo from "./../../public/logo.png";
import { Link } from "react-router-dom";
function Header() {
  const [rightOpen, setRightOpen] = useState(false);
  const store = useStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          <Link to="/">
            <img src={logo} height="50px" className={style.logo}></img>
          </Link>
        </div>
        <div className={style.functions}>
          {store.user.login && (
            <>
              {store.user.info.username && (
                <div onClick={() => setRightOpen(true)}>
                  <CuAvatar from="Index"></CuAvatar>
                </div>
              )}

              <MenuRight open={rightOpen} setOpen={setRightOpen}></MenuRight>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default observer(Header);
