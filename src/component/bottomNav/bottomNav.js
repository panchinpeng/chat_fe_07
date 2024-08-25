import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import style from "./bottomNav.module.css";
import { useNavigate } from "react-router-dom";
import PostTypeDialog from "../dialog/postType/postType";
import { useState } from "react";
function BottomNav() {
  const store = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  if (store.user.login) {
    return (
      <>
        <Paper sx={{ width: "100%", flex: "0 0 0" }} elevation={3}>
          <BottomNavigation
            showLabels
            value=""
            onChange={(event, newValue) => {}}
          >
            <BottomNavigationAction
              label="動態"
              icon={<AddCommentIcon />}
              sx={{ flex: "1 1 0" }}
              onClick={() => setOpen(true)}
            />

            <BottomNavigationAction
              label="訊息"
              icon={
                store.user.account.unread * 1 > 0 ? (
                  <Badge
                    badgeContent={store.user.account.unread}
                    color="error"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    max={999}
                  >
                    <MessageIcon />
                  </Badge>
                ) : (
                  <MessageIcon />
                )
              }
              sx={{ flex: "1 1 0" }}
              onClick={() => navigate("/member/chatroom")}
            />
          </BottomNavigation>
        </Paper>
        <PostTypeDialog
          open={open}
          handleClose={() => setOpen(false)}
        ></PostTypeDialog>
      </>
    );
  }
  return null;
}

export default observer(BottomNav);
