import { Box, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import style from "./online.module.css";
import SendIcon from "@mui/icons-material/Send";
import ReplyAllSharpIcon from "@mui/icons-material/ReplyAllSharp";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useParams } from "react-router-dom";
import api from "../../common/api";
import Message from "../../component/message/message";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

function Online() {
  const store = useStore();
  const { friend } = useParams();
  const socket = useRef(null);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(null);
  const renderReplyMessage = () => {
    const msgObj = history.find((msg) => msg.id === reply);
    return msgObj.message;
  };

  const updateUnreadData = useCallback(() => {
    socket.current.emit("receiveMessage", friend, (totalUnreadCount) => {
      store.user.changeUnread(totalUnreadCount);
    });
  }, [friend]);
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.REACT_APP_API_DOMAIN, {
        withCredentials: true,
      });
      socket.current.on("connect", () => {
        console.log("connect ....");
      });
      socket.current.on("message", (message) => {
        setHistory((history) => [{ ...message }, ...history]);
        updateUnreadData();
      });
      socket.current.on("disconnect", (reason) => {
        if (reason.indexOf("client disconnect") === -1) {
          alert("網路好像不太穩");
        }
      });
    }

    (async () => {
      // 取得歷史訊息
      if (friend) {
        const res = await api.getMessageHistory(friend);
        if (res && res.status) {
          setTimeout(() => {
            updateUnreadData();
          }, 2000);
          setHistory(res.data);
        }
      }
    })();
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleInput = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    if (message) {
      socket.current.emit("message", message, friend, (res) => {
        if (res.status && res.data) {
          setHistory((history) => [{ ...res.data }, ...history]);
          setMessage("");
        } else {
          alert("訊息傳送失敗");
          console.log(res);
        }
      });
    }
  };
  return (
    <Box className={style.box}>
      <div className={style.history}>
        {history.map((message) => (
          <Message
            message={message}
            key={message.id}
            setReply={setReply}
          ></Message>
        ))}
      </div>
      <div className={style.inputMessage}>
        {reply && (
          <div className={style.replyWrap}>
            <ReplyAllSharpIcon className={style.replyMark}></ReplyAllSharpIcon>
            <div className={style.replyContent}>
              {renderReplyMessage()}
              <HighlightOffSharpIcon
                color="primary"
                className={style.close}
                onClick={() => setReply(null)}
              ></HighlightOffSharpIcon>
            </div>
          </div>
        )}
        <TextField
          fullWidth
          id="filled-multiline-static"
          label="想說甚麼"
          multiline
          maxRows={8}
          variant="standard"
          onChange={handleInput}
          value={message}
          InputProps={{
            endAdornment: (
              <SendIcon
                sx={{ fontSize: "30px", cursor: "pointer" }}
                onClick={sendMessage}
              ></SendIcon>
            ),
          }}
        />
      </div>
    </Box>
  );
}
export default observer(Online);
