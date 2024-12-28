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
import Emoji from "../../component/emoji/emoji";

function Online() {
  const store = useStore();
  const navigate = useNavigate();
  const { friend } = useParams();
  const socket = useRef(null);
  const messageIds = useRef([]);
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
      store.user.changeUnread(totalUnreadCount.unread);
    });
  }, [friend]);
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.REACT_APP_API_DOMAIN, {
        withCredentials: true,
      });
      socket.current.on("connect", () => {
        console.log("connect ....");
        setNetworkError((networkError) => {
          (async () => {
            if (networkError) {
              const res = await api.getMessageHistory(friend);
              if (res && res.status) {
                setTimeout(() => {
                  updateUnreadData();
                }, 2000);
                setHistory(res.data);
              }
            }
          })();

          return false;
        });
      });
      socket.current.on("message", async (message) => {
        let historyMsgObj;
        if (message.reply_id) {
          historyMsgObj = messageIds.current.findIndex(
            (item) => item === message.reply_id
          );
          if (historyMsgObj <= -1) {
            // 對方已經滾到上方，本地尚未有資料
            const replyMessage = await api.getSingleHistory(
              friend,
              message.reply_id
            );
            if (replyMessage) {
              historyMsgObj = replyMessage.data.message;
            }
          }
        }
        setHistory((history) => [
          {
            ...message,
            reply_message:
              historyMsgObj === undefined || historyMsgObj === -1
                ? ""
                : typeof historyMsgObj === "string"
                  ? historyMsgObj
                  : history[historyMsgObj].message,
          },
          ...history,
        ]);
        updateUnreadData();
      });
      socket.current.on("reaction", (reaction) => {
        setHistory((history) => {
          const cpHistory = [...history];
          const targetMessageIndex = cpHistory.findIndex(
            (item) => item.id === reaction.id
          );
          if (targetMessageIndex > -1) {
            cpHistory[targetMessageIndex].reaction = {
              ...(cpHistory[targetMessageIndex].reaction
                ? cpHistory[targetMessageIndex].reaction
                : {}),
              ...reaction.reaction,
            };
          }
          return cpHistory;
        });
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

  useEffect(() => {
    messageIds.current = history.map((item) => item.id);
  }, [history]);

  const handleInput = (e) => {
    setMessage(e.target.value);
  };
  const sendReaction = (unified, id, room) => {
    if (unified) {
      socket.current.emit("reaction", unified, room, id, (res) => {
        if (res.status) {
          setHistory((history) => {
            const cpHistory = [...history];
            const targetMessageIndex = history.findIndex(
              (item) => item.id === id
            );
            if (targetMessageIndex > -1) {
              if (cpHistory[targetMessageIndex].reaction) {
                cpHistory[targetMessageIndex].reaction[
                  store.user.account.username
                ] = unified;
              } else {
                cpHistory[targetMessageIndex].reaction = {
                  [store.user.account.username]: unified,
                };
              }
            }

            return cpHistory;
          });
        }
      });
    }
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
            sendReaction={sendReaction}
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
      <div className={style.preloadEmoji}>
        <Emoji open={true}></Emoji>
      </div>
    </Box>
  );
}
export default observer(Online);
