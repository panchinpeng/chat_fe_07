// Online.jsx
import { Box, TextareaAutosize } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import style from "./online.module.css";
import SendIcon from "@mui/icons-material/Send";
import ReplyAllSharpIcon from "@mui/icons-material/ReplyAllSharp";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import ImageIcon from "@mui/icons-material/Image";
import { useParams } from "react-router-dom";
import api from "../../common/api";
import Message from "../../component/message/message";
import RecycleMessage from "../../component/recycleMessage/recycleMessage";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "./../../hooks/useIntersectionObserver";
import MessageUploadFile from "../../component/messageUploadFile/messageUploadFile";
import VisibilityCheck from "./visibilityCheck"; // 加入可視區塊判斷元件
import Recording from "./recording";

function Online() {
  const store = useStore();
  const navigate = useNavigate();
  const { friend } = useParams();
  const { startObserve, isIntersecting } = useIntersectionObserver();

  const socket = useRef(null);
  const messageIds = useRef([]);
  const loadMoreDom = useRef();
  const uploadImageDom = useRef();
  const [history, setHistory] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileKey, setFileKey] = useState(1);

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
      socket.current = io(process.env.REACT_APP_SOCKET_DOMAIN, {
        withCredentials: true,
        transports: ["websocket"],
      });
      socket.current.on("connect", () => {
        setNetworkError((networkError) => {
          (async () => {
            if (networkError) {
              const res = await api.getMessageHistory(friend);
              if (res && res.status) {
                setTimeout(() => updateUnreadData(), 2000);
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
            const replyMessage = await api.getSingleHistory(
              friend,
              message.reply_id
            );
            if (replyMessage) {
              historyMsgObj = replyMessage.data.message;
            }
          }
        }
        if (message.message.path2) {
          message.message.path = message.message.path2;
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
      socket.current.on("delMessage", (delRes) => {
        setHistory((history) => {
          const cpHistory = [...history];
          const targetMessageIndex = cpHistory.findIndex(
            (item) => item.id === delRes.id
          );
          if (targetMessageIndex > -1) {
            cpHistory[targetMessageIndex].is_del = 1;
          }
          return cpHistory;
        });
      });
      socket.current.on("logout", () => navigate("/logout"));
      socket.current.on("disconnect", (reason) => {
        if (!reason.includes("client disconnect")) {
          setNetworkError(socket.current.active ? 1 : 2);
        }
      });
      socket.current.on("connect_error", (error) => {
        if (error.message === "login fail") navigate("/logout");
        console.log("connect_error", error.message);
      });
      socket.current.on("reconnect_failed", () => {
        console.log("reconnect_failed");
      });
    }
    (async () => {
      if (friend) {
        const res = await api.getMessageHistory(friend);
        if (res && res.status) {
          setTimeout(() => updateUnreadData(), 2000);
          setHistory(res.data);
          setTimeout(() => {
            startObserve(loadMoreDom.current);
          }, 300);
        }
      }
    })();
    return () => socket.current.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      if (isIntersecting) {
        store.loading.setLoading(true);
        const res = await api.getMessageHistory(
          friend,
          messageIds.current[messageIds.current.length - 1]
        );
        if (res && res.data.length) {
          setHistory((h) => [...h, ...res.data]);
          setTimeout(() => {
            // 等待訊息loading完成，避免載入出現空白
            store.loading.setLoading(false);
          }, 1000);
        } else {
          store.loading.setLoading(false);
        }
      }
    })();
  }, [isIntersecting]);

  useEffect(() => {
    messageIds.current = history.map((item) => item.id);
  }, [history]);

  const handleInput = (e) => setMessage(e.target.value);

  const sendReaction = (unified, id, room) => {
    if (unified) {
      socket.current.emit("reaction", unified, room, id, (res) => {
        if (res.status) {
          setHistory((history) => {
            const cpHistory = [...history];
            const targetMessageIndex = cpHistory.findIndex(
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

  const deleteMessage = (id, room) => {
    if (id && room) {
      socket.current.emit("delMessage", room, id, (res) => {
        if (res.status) {
          setHistory((history) => {
            const cpHistory = [...history];
            const targetMessageIndex = cpHistory.findIndex(
              (item) => item.id === id
            );
            if (targetMessageIndex > -1)
              cpHistory[targetMessageIndex].is_del = 1;
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
              reply_id: reply || null,
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

  const handleImage = (e) => {
    if (e.target.files.length === 1) {
      const file = e.target.files[0];
      if (file.size > 9.5 * 1024 * 1024) {
        setFileKey((k) => k + 1);
        store.tip.show("file to large limit 9MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => setPreviewImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const submitPicMessage = () => {
    if (uploadImageDom.current.files.length === 1) {
      const file = uploadImageDom.current.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        socket.current.emit(
          "sendImage",
          { image: new Uint8Array(arrayBuffer), type: file.type },
          friend,
          (res) => {
            setFileKey((k) => k + 1);
            if (res.status) {
              setHistory((history) => [res.data, ...history]);
              setPreviewImage(null);
            } else {
              alert("訊息檔案失敗");
              console.log(res);
            }
          }
        );
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Box className={style.box}>
      <div className={style.history}>
        {networkError && (
          <div className={style.disconnectNetwork}>
            {networkError === 1
              ? "網路不穩，請稍後..."
              : "網路錯誤，請重新整理再試..."}
          </div>
        )}

        {history.map((message) => (
          <VisibilityCheck key={message.id}>
            {message.is_del === 1 ? (
              <RecycleMessage />
            ) : (
              <Message
                message={message}
                setReply={setReply}
                sendReaction={sendReaction}
                deleteMessage={deleteMessage}
              />
            )}
          </VisibilityCheck>
        ))}

        <div ref={loadMoreDom} id="loadMoreDom"></div>
      </div>

      <div className={style.inputMessage}>
        {reply && (
          <div className={style.replyWrap}>
            <ReplyAllSharpIcon className={style.replyMark} />
            <div className={style.replyContent}>
              {renderReplyMessage()}
              <HighlightOffSharpIcon
                color="primary"
                className={style.close}
                onClick={() => setReply(null)}
              />
            </div>
          </div>
        )}

        <div className={style.userInputWrap}>
          <label htmlFor="addImage" className={style.selectPic}>
            <ImageIcon
              sx={{
                fontSize: "30px",
                cursor: "pointer",
                mr: 0.5,
                color: "#575757",
              }}
            />
          </label>
          <input
            type="file"
            id="addImage"
            accept="image/*"
            onChange={handleImage}
            ref={uploadImageDom}
            key={fileKey}
          />
          <TextareaAutosize
            className={style.input}
            minRows={1}
            maxRows={10}
            onChange={handleInput}
            value={message}
            placeholder="輸入訊息"
          />
          {message ? (
            <SendIcon
              sx={{
                fontSize: "30px",
                cursor: "pointer",
                mr: 0.5,
                color: "#575757",
              }}
              onClick={sendMessage}
            />
          ) : (
            <Recording friend={friend} />
          )}
        </div>
      </div>

      {previewImage && (
        <MessageUploadFile
          image={previewImage}
          handleClose={() => {
            setPreviewImage(null);
            setFileKey((k) => k + 1);
          }}
          submitFile={submitPicMessage}
        />
      )}
    </Box>
  );
}

export default observer(Online);
