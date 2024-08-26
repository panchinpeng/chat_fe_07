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
import { useNavigate } from "react-router-dom";

function Online() {
  const store = useStore();
  const navigate = useNavigate();
  const { friend } = useParams();
  const socket = useRef(null);
  const [history, setHistory] = useState([]);
  const [networkError, setNetworkError] = useState(false);
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
        setNetworkError(false);
      });
      socket.current.on("message", (message) => {
        setHistory((history) => [
          {
            ...message,
            reply_message: message.reply_id
              ? history.find((item) => item.id === message.reply_id).message
              : "",
          },
          ...history,
        ]);
        updateUnreadData();
      });
      socket.current.on("disconnect", (reason) => {
        if (reason.indexOf("client disconnect") === -1) {
          setNetworkError(true);
        }
      });

      socket.current.on("connect_error", (error) => {
        if (error.message === "login fail") {
          navigate("/logout");
        }
        console.log("connect_error", error, error.message);
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
      socket.current.emit("message", message, friend, reply, (res) => {
        if (res.status && res.data) {
          setHistory((history) => [
            {
              ...res.data,
              reply_id: reply ? reply : null,
              reply_message: reply
                ? history.find((item) => item.id === reply).message
                : "",
            },
            ...history,
          ]);
          setMessage("");
          setReply(null);
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
        {networkError && (
          <div className={style.disconnectNetwork}>網路好像不太給力...</div>
        )}
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
          sx={{ mt: 1 }}
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
