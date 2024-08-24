import { lazy, useEffect, useState } from "react";
import { AppBar, Badge, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import style from "./header.module.css";
import MenuRight from "../menuRight/menuRight";
import PeopleIcon from "@mui/icons-material/People";

// store
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
import logo from "./../../public/logo.png";
import { Link } from "react-router-dom";

const FriendApply = lazy(() => import("./../friendApply/friendApply"));

function Header() {
  const [rightOpen, setRightOpen] = useState(false);
  const [friendApplyOpen, setFriendApplyOpen] = useState(false);
  const store = useStore();

  return (
    <>
      <AppBar position="static" sx={{ flex: "0 0 0", zIndex: "9" }}>
        <Toolbar>
          <div>
            <Link to="/">
              <img
                alt="logo"
                src={logo}
                height="50px"
                className={style.logo}
              ></img>
            </Link>
          </div>

          <div className={style.functions}>
            {store.user.account.applyFriends > 0 ? (
              <Badge
                badgeContent={store.user.account.applyFriends}
                color="error"
                onClick={() => setFriendApplyOpen(true)}
              >
                <PeopleIcon sx={{ fontSize: 28 }}></PeopleIcon>
              </Badge>
            ) : (
              <div></div>
            )}

            <MenuIcon
              sx={{ fontSize: 28 }}
              onClick={() => setRightOpen(true)}
            ></MenuIcon>
          </div>

          <MenuRight open={rightOpen} setOpen={setRightOpen}></MenuRight>
        </Toolbar>
      </AppBar>
      {store.user.account.applyFriends > 0 && friendApplyOpen && (
        <FriendApply
          open={friendApplyOpen}
          setOpen={setFriendApplyOpen}
        ></FriendApply>
      )}
    </>
  );
}
export default observer(Header);
