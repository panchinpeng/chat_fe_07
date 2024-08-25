import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import Avatar from "../../component/avatar/avatar";
import style from "./chatroom.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import TrendOverride from "../../component/trendOverview/trendOverview";
function Chatroom() {
  const store = useStore();
  const [friend, setFriend] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await api.getFriend();
      if (res && res.status) {
        setFriend(res.data);
      }
    })();
  }, []);
  const navigator = useNavigate();
  return (
    <Box className={style.content}>
      {friend.length > 0 ? (
        <>
          <TrendOverride></TrendOverride>
          <List sx={{ width: "100vw", bgcolor: "#ffffff82" }}>
            {friend.map((item, index) => {
              const friendUsername =
                item.username === store.user.account.username
                  ? item.friend_username
                  : item.username;

              return (
                <>
                  <ListItem
                    alignItems="flex-start"
                    onClick={() =>
                      navigator(`/member/online/${friendUsername}`)
                    }
                  >
                    <ListItemAvatar sx={{ minWidth: 0 }}>
                      <Avatar
                        from="Index"
                        friendTrends={0}
                        friendName={friendUsername}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ ml: 1 }}
                      primary={friendUsername}
                      className={style.lastMessage}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
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
                </>
              );
            })}
          </List>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: "#8d8888",
          }}
        >
          哭哭，沒有好朋友
        </Box>
      )}

      {/*  */}
    </Box>
  );
}

export default observer(Chatroom);
