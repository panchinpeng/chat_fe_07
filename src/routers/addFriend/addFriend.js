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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../common/api";
import Avatar from "../../component/avatar/avatar";
import FriendInvite from "../../component/friendInvite/friendInvite";

export default function AddFriend() {
  const [keyword, setKeyword] = useState("");
  const [friend, setFriend] = useState([]);
  const [seleceUser, setSelectUser] = useState("");
  const searchHandler = async () => {
    setFriend(false);
    const res = await api.searchFriend(keyword);
    if (res.status) {
      setFriend(res.data);
    }
  };
  return (
    <>
      <Box sx={{ bgcolor: "primary.main", width: "100vw" }}>
        <Paper
          component="form"
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
            {friend.map((friendItem) => (
              <Fragment key={friendItem.username}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => setSelectUser(friendItem.username)}
                >
                  <ListItemAvatar>
                    <Avatar
                      from="Index"
                      friendName={friendItem.username}
                      friendTrends={friendItem.trends}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={friendItem.username}
                    secondary={
                      friendItem.self_introd
                        ? friendItem.self_introd
                        : "這個人很懶，沒有個人簡介"
                    }
                  />
                </ListItem>
                <Divider />
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
      ></FriendInvite>
    </>
  );
}
