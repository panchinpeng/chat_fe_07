import React, { useState, useEffect } from "react";
import {
  Dialog,
  AppBar,
  Slide,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "../avatar/avatar";
import style from "./postArticleShare.module.css";
import api from "../../common/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostArticleShare({
  closeParentDialog,
  articleId,
  showWarn,
}) {
  const [open, setOpen] = useState(true);
  const [friends, setFriends] = useState([]);
  const [shareUsers, setShareUsers] = useState([]);
  const submitShare = async () => {
    const shareResult = await api.addShareArticle(articleId, shareUsers);
    if (shareResult) {
      showWarn({
        type: "success",
        message: "已分享",
      });
      closeParentDialog();
    } else {
      showWarn({
        type: "error",
        message: "發生錯誤",
      });
    }
  };

  const selectFriend = (friend) => {
    const selectedIndex = shareUsers.findIndex(
      (shareUser) => friend === shareUser
    );
    if (selectedIndex > -1) {
      const copyShareUsers = shareUsers.slice();
      copyShareUsers.splice(selectedIndex, 1);
      setShareUsers(copyShareUsers);
    } else {
      setShareUsers([...shareUsers, friend]);
    }
  };

  useEffect(() => {
    (async () => {
      const friends = await api.getFriend();
      if (friends && friends.data) {
        setFriends(friends.data);
      }
    })();
  }, []);
  return (
    <Dialog
      fullScreen
      open={open}
      maxWidth={false}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setOpen(false);
              closeParentDialog();
            }}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            分享
          </Typography>
          <Button autoFocus color="inherit" onClick={submitShare}>
            發送
          </Button>
        </Toolbar>
      </AppBar>
      <h6 className={style.shareTitle}>選擇分享的對象</h6>
      <List>
        {friends.map((friend) => (
          <ListItem
            key={friend}
            disablePadding
            secondaryAction={
              <Checkbox
                checked={shareUsers.includes(friend)}
                onChange={() => selectFriend(friend)}
              ></Checkbox>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar from="Index" disabledClick friendName={friend} />
              </ListItemAvatar>
              <ListItemText primary={friend}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
