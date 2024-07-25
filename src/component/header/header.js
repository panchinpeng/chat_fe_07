import { useState } from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import style from "./header.module.css";
import MenuRight from "../menuRight/menuRight";

// store
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

function Header() {
  const [rightOpen, setRightOpen] = useState(false);
  const store = useStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <div>🅻🅾🆅🅴 ​ & ​ 🅲🅷🅰🆃</div>
        <div className={style.functions}>
          {store.user.login && (
            <>
              {store.user.info.username && (
                <Avatar onClick={() => setRightOpen(true)}>
                  {store.user.info.username.substr(0, 1).toUpperCase()}
                </Avatar>
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
