import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import style from "./bottomNav.module.css";
import { useNavigate } from "react-router-dom";
function BottomNav() {
  const store = useStore();
  const navigate = useNavigate();
  if (store.user.login) {
    return (
      <>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 3 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value=""
            onChange={(event, newValue) => {}}
          >
            <BottomNavigationAction
              label="動態"
              icon={<AddCommentIcon />}
              sx={{ flex: "1 1 0" }}
              onClick={() => navigate("/member/post")}
            />
            <BottomNavigationAction
              label="訊息"
              icon={<MessageIcon />}
              sx={{ flex: "1 1 0" }}
              onClick={() => navigate("/member/chatroom")}
            />
          </BottomNavigation>
        </Paper>
        <div className={style.placeholder}></div>
      </>
    );
  }
  return null;
}

export default observer(BottomNav);
