import React, { useState, Fragment, useRef } from "react";
import style from "./addFriend.module.css";
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../common/api";
import Avatar from "../../component/avatar/avatar";
import FriendInvite from "../../component/dialog/friendInvite/friendInvite";
import Alert from "./../../component/alert/alert";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

function AddFriend() {
  const [keyword, setKeyword] = useState("");
  const [friend, setFriend] = useState([]);
  const [seleceUser, setSelectUser] = useState("");
  const [inviteUser, setInviteUser] = useState([]);
  const alertRef = useRef();
  const store = useStore();
  const searchHandler = async () => {
    setFriend(false);
    const res = await api.searchFriend(keyword);
    if (res.status) {
      setFriend(res.data);
    }
  };
  const AddFriendResFn = async (status) => {
    if (status) {
      setInviteUser((inviteUser) => [...inviteUser, seleceUser]);
      setSelectUser("");
    }
    if (status) {
      alertRef.current.setMessage("已送出邀請");
      alertRef.current.setSeverity("success");
    } else {
      alertRef.current.setMessage("出現錯誤，請重新在試");
      alertRef.current.setSeverity("error");
    }
  };
  const handleAccept = async (username, index) => {
    const res = await api.setFriendApply("allow", username);
    if (res.status) {
      alertRef.current.setMessage("已成為好友，趕快敲他聊天吧");
      const cfriend = [...friend];
      cfriend.splice(index, 1);
      setFriend(cfriend);
      store.user.verify();
    } else {
      alertRef.current.setMessage("發生錯誤，請重試");
      alertRef.current.setSeverity("error");
    }
  };
  const handleReject = async (username, index) => {
    const res = await api.setFriendApply("reject", username);
    if (res.status) {
      alertRef.current.setMessage("成功拒絕好友邀請");
      const cfriend = [...friend];
      cfriend.splice(index, 1);
      setFriend(cfriend);
      store.user.verify();
    } else {
      alertRef.current.setMessage("發生錯誤，請重試");
      alertRef.current.setSeverity("error");
    }
  };
  const sendAddFriend = (friendItem) => {
    if (friendItem.receiveApplying) {
      return;
    }
    if (inviteUser.includes(friendItem.username) || friendItem.applying) {
      return;
    }
    setSelectUser(friendItem.username);
  };
  return (
    <>
      <Box sx={{ bgcolor: "primary.main", width: "100vw" }}>
        <Paper
          sx={{
            m: 2,
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <InputBase
            placeholder="搜尋好友"
            inputProps={{ "aria-label": "搜尋好友" }}
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.trim())}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={searchHandler}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{ flex: "1 1 0", p: 1, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          搜尋結果
        </Typography>
        {friend.length > 0 && friend.map ? (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {friend.map((friendItem, index) => (
              <Fragment key={friendItem.username}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => sendAddFriend(friendItem)}
                >
                  <ListItemAvatar>
                    <Avatar from="Index" friendName={friendItem.username} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={friendItem.username}
                    secondary={
                      <div>
                        {friendItem.self_introd
                          ? friendItem.self_introd
                          : "這個人很懶，沒有個人簡介"}

                        {friendItem.receiveApplying && (
                          <div className={style.replyAction}>
                            <Button
                              size="medium"
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleAccept(friendItem.username, index)
                              }
                            >
                              允許
                            </Button>
                            <Button
                              size="medium"
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleReject(friendItem.username, index)
                              }
                            >
                              拒絕
                            </Button>
                          </div>
                        )}
                      </div>
                    }
                  />
                  {(inviteUser.includes(friendItem.username) ||
                    friendItem.applying * 1 === 1) && (
                    <div className={style.AddFriendWait}>等待回復</div>
                  )}

                  {(inviteUser.includes(friendItem.username) ||
                    friendItem.applying * 1 === 2) && (
                    <div className={style.AddFriendWait}>已成為好友</div>
                  )}
                  {friendItem.receiveApplying && (
                    <div className={style.AddFriendWait}>已邀請你</div>
                  )}
                </ListItem>
                {friend.length !== index + 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        ) : friend === false ? (
          <div className={style.textCenter}>
            <CircularProgress />
          </div>
        ) : (
          <div>無資料</div>
        )}
      </Box>
      <FriendInvite
        friendUsername={seleceUser}
        closeFn={() => setSelectUser("")}
        AddFriendFn={AddFriendResFn}
      ></FriendInvite>
      <Alert severity="success" ref={alertRef}></Alert>
    </>
  );
}
export default observer(AddFriend);
