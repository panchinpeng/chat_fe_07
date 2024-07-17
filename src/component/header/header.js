import { AppBar, Toolbar, Avatar } from "@mui/material";
import style from "./header.module.css";

// store
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

function Header() {
  const store = useStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={style.functions}>
          {store.user.login && (
            <>
              <Avatar>
                {store.user.info.username.substr(0, 1).toUpperCase()}
              </Avatar>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default observer(Header);
