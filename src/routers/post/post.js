import { useRef, useState } from "react";
import style from "./post.module.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const navigate = useNavigate();
  const intervalID = useRef();
  const textatea = useRef();
  const imgIuput = useRef();
  const [message, setMessage] = useState({
    clientX: 0,
    clientY: 0,
    message: "",
    zoom: 1,
  });

  const showEditer = (e) => {
    clearInterval(intervalID.current);
    const { clientX, clientY } = e;
    setMessage((message) => ({
      clientX,
      clientY,
      message: message.message,
      zoom: 1,
    }));
    textatea.current.focus();
  };

  return (
    <>
      <div className={style.bg} onClick={(e) => showEditer(e)}>
        <div className={message.message ? style.none : style.placeholder}>
          今天心情是...
        </div>
        <textarea
          className={style.textarea}
          ref={textatea}
          style={{
            top: `${message.clientY}px`,
            left: `${message.clientX}px`,
            transform: `scale(${message.zoom})`,
          }}
          onClick={(e) => e.stopPropagation()}
          onInput={(e) => {
            setMessage((message) => ({ ...message, message: e.target.value }));
            e.target.height = "100px";
            e.target.width = "100px";
            e.target.style.height = `${e.target.scrollHeight}px`;
            e.target.style.width = `${e.target.scrollWidth}px`;
            clearInterval(intervalID.current);
            const domRect = e.target.getBoundingClientRect();
            if (
              domRect.height + message.clientY > window.innerHeight ||
              domRect.width + message.clientX > window.innerWidth
            ) {
              intervalID.current = setInterval(() => {
                const domRect = e.target.getBoundingClientRect();
                if (
                  domRect.height + message.clientY > window.innerHeight ||
                  domRect.width + message.clientX > window.innerWidth
                ) {
                  setMessage((message) => ({
                    ...message,
                    zoom: message.zoom - 0.1,
                  }));
                } else {
                  clearInterval(intervalID.current);
                }
              }, 200);
            }
          }}
        >
          {message.message}
        </textarea>
        <input type="file" id="postImg" ref={imgIuput}></input>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {[
          { title: "delete", icon: <DeleteIcon></DeleteIcon> },
          {
            title: "send",
            icon: <SendIcon></SendIcon>,
          },
          { title: "picture", icon: <InsertPhotoIcon></InsertPhotoIcon> },
        ].map((action) => (
          <SpeedDialAction
            key={action.title}
            tooltipTitle={action.title}
            icon={action.icon}
            onClick={() => {
              switch (action.title) {
                case "delete":
                  navigate(-1);
                  break;
                case "picture":
                  imgIuput.current.click();
                  break;
                case "send":
                  break;
              }
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
}
