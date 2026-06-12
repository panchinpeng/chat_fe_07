import React, { useState, Fragment } from "react";
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

import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import RecommendedFriend from "../../component/recommendFriend/recommendFriend";

function AddFriend() {
  const [keyword, setKeyword] = useState("");
  const [friend, setFriend] = useState([]);
  const [seleceUser, setSelectUser] = useState("");
  const [inviteUser, setInviteUser] = useState([]);
  const store = useStore();
  const searchHandler = async () => {
    setFriend(false);
    if (!keyword) {
      setFriend([]);
      return false;
    }
    const res = await api.searchFriend(keyword);
    if (res.status) {
      if (res.data.length === 0) {
        store.tip.show("找不到用戶", "error");
      }
      setFriend(res.data);
    }
  };
  const AddFriendResFn = async (status) => {
    if (status) {
      setInviteUser((inviteUser) => [...inviteUser, seleceUser]);
      setSelectUser("");
    }
    if (status) {
      store.tip.show("已送出邀請", "success");
    } else {
      store.tip.show("出現錯誤，請重新再試", "error");
    }
  };
  const handleAccept = async (username, index) => {
    const res = await api.setFriendApply("allow", username);
    if (res.status) {
      store.tip.show("已成為好友，趕快敲他聊天吧", "success");
      const cfriend = [...friend];
      cfriend.splice(index, 1);
      setFriend(cfriend);
      store.user.verify();
    } else {
      store.tip.show("發生錯誤，請重試", "error");
    }
  };
  const handleReject = async (username, index) => {
    const res = await api.setFriendApply("reject", username);
    if (res.status) {
      store.tip.show("成功拒絕好友邀請", "success");
      const cfriend = [...friend];
      cfriend.splice(index, 1);
      setFriend(cfriend);
      store.user.verify();
    } else {
      store.tip.show("發生錯誤，請重試", "error");
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
        <div className={style.searchHero}>
          <Typography variant="h5" className={style.searchTitle}>
            找朋友
          </Typography>
          <Typography variant="body2" className={style.searchSubtitle}>
            輸入使用者名稱，找到熟悉的人一起聊天。
          </Typography>
        <Paper
          className={style.searchBar}
          sx={{
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
        </div>
      </Box>
      <Box className={style.content} sx={{ flex: "1 1 0", width: "100%" }}>
        {friend.length > 0 && friend.map ? (
          <div className={style.resultPanel}>
            <Typography variant="h6" className={style.sectionTitle}>
              搜尋結果
            </Typography>
            <List className={style.resultList}>
              {friend.map((friendItem, index) => (
                <Fragment key={friendItem.username}>
                  <ListItem
                    className={style.resultItem}
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
                      <div className={style.AddFriendWait}>等待回覆</div>
                    )}

                    {friendItem.applying * 1 === 2 && (
                      <div className={style.friendBadge}>已成為好友</div>
                    )}
                    {friendItem.receiveApplying && (
                      <div className={style.inviteBadge}>已邀請你</div>
                    )}
                  </ListItem>
                  {friend.length !== index + 1 && <Divider className={style.divider} />}
                </Fragment>
              ))}
            </List>
          </div>
        ) : friend === false ? (
          <div className={style.textCenter}>
            <CircularProgress />
          </div>
        ) : (
          <RecommendedFriend></RecommendedFriend>
        )}
      </Box>
      <FriendInvite
        friendUsername={seleceUser}
        closeFn={() => setSelectUser("")}
        AddFriendFn={AddFriendResFn}
      ></FriendInvite>
    </>
  );
}
export default observer(AddFriend);
