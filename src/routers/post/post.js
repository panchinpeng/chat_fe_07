import React, { useEffect, useRef, useState, useCallback } from "react";
import style from "./post.module.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useNavigate } from "react-router-dom";
import interact from "interactjs";
import ColorPick from "./../../component/colorPick/colorPick";
var angleScale = {
  angle: 0,
  scale: 1,
};

export default function Post() {
  const navigate = useNavigate();
  const intervalID = useRef();
  const textarea = useRef();
  const imgIuput = useRef();
  const resetTimeout = useRef();
  const [loopTouch, setLoopTouch] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    bgImage: "",
    textColor: "#fff",
  });

  useCallback(() => {}, []);

  useEffect(() => {
    window.dragMoveListener = (event) => {
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.transform = "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    };
    interact(".textareaWrap")
      .gesturable({
        listeners: {
          start(event) {
            angleScale.angle -= event.angle;
            clearTimeout(resetTimeout.current);
            textarea.current.classList.remove("reset");
          },
          move(event) {
            const currentAngle = event.angle + angleScale.angle;
            const currentScale = event.scale * angleScale.scale;

            textarea.current.style.transform =
              "rotate(" + currentAngle + "deg)" + "scale(" + currentScale + ")";

            window.dragMoveListener(event);
          },
          end(event) {
            angleScale.angle = angleScale.angle + event.angle;
            angleScale.scale = angleScale.scale * event.scale;
          },
        },
      })
      .draggable({
        listeners: { move: window.dragMoveListener },
      });

    return () => {
      window.dragMoveListener = undefined;
    };
  }, []);

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setMessage((message) => ({ ...message, bgImage: e.target.result }));
      };
      fileReader.readAsDataURL(file);
    }
  };

  const textareaContextMenuEvent = (e) => {
    setLoopTouch(true);
    e.preventDefault();
    e.stopPropagation();
  };
  const textareaInputEvent = (e) => {
    setMessage((message) => ({
      ...message,
      message: e.target.value,
    }));

    e.target.style.height = `${e.target.scrollHeight}px`;
    e.target.style.width = `${e.target.scrollWidth}px`;
  };
  return (
    <>
      <div className={style.bg}>
        {message.bgImage && (
          <div
            className={style.bgImage}
            style={{ backgroundImage: `url(${message.bgImage})` }}
          ></div>
        )}
        <div className={`${style.textareaWrap} textareaWrap`}>
          <textarea
            placeholder="今天心情是..."
            value={message.message}
            className={`${style.textarea} textarea`}
            ref={textarea}
            style={{
              color: `${message.textColor}`,
            }}
            onContextMenu={(e) => textareaContextMenuEvent(e)}
            onInput={textareaInputEvent}
          ></textarea>
        </div>
      </div>
      {loopTouch && (
        <div className={style.colorPick}>
          <ColorPick
            setColor={(color) => {
              setMessage((message) => ({ ...message, textColor: color }));
              setLoopTouch(false);
            }}
          ></ColorPick>
        </div>
      )}
      <input
        type="file"
        id="postImg"
        ref={imgIuput}
        style={{ display: "none" }}
        onChange={previewImage}
        accept="image/*"
      ></input>
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
