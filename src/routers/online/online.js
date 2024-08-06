import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import style from "./online.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import api from "../../common/api";
import Message from "../../component/message/message";

export default function Online() {
  const { friend } = useParams();
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  // const [users, setUsers] = useState([]);
  // console.log(friend);
  useEffect(() => {
    // if (!socket.current) {
    //   socket.current = io("ws://localhost:3002", {
    //     auth: { username: localStorage.getItem("username") },
    //   });
    //   socket.current.onAny((event, ...args) => {
    //     console.log(event, args);
    //   });
    //   socket.current.on("connect_error", (err) => {
    //     if (err.message === "invalid username") {
    //       console.log("usernameAlreadySelected");
    //     }
    //   });
    //   socket.current.on("user connected", (newUser) => {
    //     setUsers((user) => [...user, newUser]);
    //   });
    //   socket.current.on("users", (users) => {
    //     setUsers(users);
    //   });
    //   socket.current.on("private_message", ({ content, from }) => {
    //     console.log("receive message", content);
    //   });
    //   setTimeout(() => {
    //     alert("CCC");
    //     socket.current.emit("test");
    //   }, 5000);
    // }
    (async () => {
      // 取得歷史訊息
      if (friend) {
        const res = await api.getMessageHistory(friend);
        if (res && res.status) {
          console.log(res);
          setMessages(res.data);
        }
      }
    })();
  }, []);
  return (
    <Box className={style.box}>
      <div className={style.history}>
        {messages.map((message) => (
          <Message message={message} key={message.id}></Message>
        ))}
      </div>
      <div className={style.inputMessage}>
        <TextField
          fullWidth
          id="filled-multiline-static"
          label="想說甚麼"
          multiline
          maxRows={8}
          variant="filled"
          InputProps={{
            endAdornment: <SendIcon sx={{ fontSize: "30px" }}></SendIcon>,
          }}
        />
      </div>
    </Box>
  );
}
