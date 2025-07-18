import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";
import Avatar from "../../component/avatar/avatar";
import style from "./chatroom.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import TrendOverride from "../../component/trendOverview/trendOverview";
import VerifiedIcon from "@mui/icons-material/Verified";
function Chatroom() {
  const store = useStore();
  const [friend, setFriend] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await api.getFriendChat();
      if (res && res.status) {
        setFriend(res.data.length ? res.data : null);
      } else {
        setFriend(null);
      }
    })();
  }, []);
  const navigator = useNavigate();

  return (
    <Box className={style.content}>
      <TrendOverride></TrendOverride>
      <List sx={{ width: "100vw", bgcolor: "#ffffff82", padding: "0" }}>
        {friend === null ? (
          <div className={style.noFriend}></div>
        ) : (
          friend.map((item, index) => {
            const friendUsername =
              item.username === store.user.account.username
                ? item.friend_username
                : item.username;

            return (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => navigator(`/member/online/${friendUsername}`)}
                  sx={{ padding: "5px 8px 5px 8px" }}
                >
                  <ListItemAvatar sx={{ minWidth: 0 }}>
                    <Avatar from="Index" friendName={friendUsername} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ ml: 1 }}
                    primary={
                      <>
                        <span className={style.chatName}>{friendUsername}</span>
                        {item.isAI && (
                          <VerifiedIcon
                            sx={{
                              fontSize: "12px",
                              color: "blue",
                            }}
                          ></VerifiedIcon>
                        )}
                      </>
                    }
                    className={style.lastMessage}
                    secondary={
                      <>
                        <Typography
                          sx={{
                            display: "inline",
                            fontSize: "13px",
                          }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.last_message || ""}
                        </Typography>
                      </>
                    }
                  ></ListItemText>

                  {item.unread > 0 && (
                    <div className={style.unread}>{item.unread}</div>
                  )}
                </ListItem>
                {index !== friend.length - 1 && <Divider />}
              </React.Fragment>
            );
          })
        )}
      </List>
    </Box>
  );
}

export default observer(Chatroom);
