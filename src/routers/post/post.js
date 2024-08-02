import React, { useEffect, useRef, useState, useCallback } from "react";
import style from "./post.module.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  SpeedDial,
  SpeedDialAction,
  Button,
  Chip,
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import SecurityIcon from "@mui/icons-material/Security";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShieldIcon from "@mui/icons-material/Shield";
import { useNavigate } from "react-router-dom";
import interact from "interactjs";
import ColorPick from "./../../component/colorPick/colorPick";
import api from "../../common/api";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
var angleScale = {
  angle: 0,
  scale: 1,
};

function Post() {
  const store = useStore();
  const navigate = useNavigate();
  const touchId = useRef();
  const textarea = useRef();
  const textWrap = useRef();
  const imgIuput = useRef();
  const resetTimeout = useRef();
  const [loopTouch, setLoopTouch] = useState(false);
  const [openDial, setOpenDial] = useState(false);
  const [openLeaveAlert, setOpenLeaveAlert] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    bgImage: "",
    textColor: "#fff",
    security: false,
  });

  useEffect(() => {
    window.dragMoveListener = (event) => {
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      console.log(
        "translate(calc(-50% + " + x + "px), calc(-50% + " + y + "px))"
      );
      target.style.transform =
        "translate(calc(-50% + " + x + "px), calc(-50% + " + y + "px))";

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
    e.preventDefault();
    e.stopPropagation();
    if (!window.supportTouch) {
      setLoopTouch(true);
    }
  };
  const textareaInputEvent = (e) => {
    setMessage((message) => ({
      ...message,
      message: e.target.value,
    }));

    e.target.style.height = `${e.target.scrollHeight}px`;
    e.target.style.width = `${e.target.scrollWidth}px`;
  };

  const textareaTouchStartEvent = (e) => {
    e.preventDefault();
    touchId.current = setTimeout(() => {
      setLoopTouch(true);
    }, 3000);
  };
  const textareaTouchEndEvent = (e) => {
    clearTimeout(touchId.current);
  };

  const addPost = async () => {
    const res = await api.addPost(
      message.message,
      message.security ? 1 : 0,
      message.textColor,
      message.bgImage ? imgIuput.current.files[0] : "",
      JSON.stringify({
        x: textWrap.current.dataset.x,
        y: textWrap.current.dataset.y,
        r: angleScale.angle,
        s: angleScale.scale,
      })
    );
    if (res.status) {
      store.user.setAccount();
      navigate(-1);
    }
  };

  return (
    <>
      <div className={style.bg} onClick={() => setLoopTouch(false)}>
        {message.bgImage && (
          <div
            className={style.bgImage}
            style={{ backgroundImage: `url(${message.bgImage})` }}
          ></div>
        )}
        <div className={`${style.textareaWrap} textareaWrap`} ref={textWrap}>
          <textarea
            placeholder="今天心情是..."
            value={message.message}
            className={`${style.textarea} textarea`}
            ref={textarea}
            style={{
              color: `${message.textColor}`,
            }}
            onContextMenu={textareaContextMenuEvent}
            onTouchStart={textareaTouchStartEvent}
            onTouchEnd={textareaTouchEndEvent}
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
        ariaLabel="more"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClose={() => setOpenDial(false)}
        onOpen={() => setOpenDial(true)}
        open={openDial}
        icon={<SpeedDialIcon />}
      >
        {[
          { title: "刪除", icon: <DeleteIcon></DeleteIcon> },
          {
            title: "傳送",
            icon: <SendIcon></SendIcon>,
          },
          { title: "選擇圖片", icon: <InsertPhotoIcon></InsertPhotoIcon> },
          {
            title: "字形顏色",
            icon: <FormatColorTextIcon></FormatColorTextIcon>,
          },
          {
            title: "私密",
            icon: message.security ? (
              <LockOpenIcon></LockOpenIcon>
            ) : (
              <SecurityIcon></SecurityIcon>
            ),
          },
        ].map((action) => (
          <SpeedDialAction
            key={action.title}
            tooltipTitle={action.title}
            icon={action.icon}
            onClick={() => {
              setOpenDial(false);
              switch (action.title) {
                case "刪除":
                  setOpenLeaveAlert(true);
                  break;
                case "選擇圖片":
                  imgIuput.current.click();
                  break;
                case "傳送":
                  addPost();
                  break;
                case "字形顏色":
                  setLoopTouch(true);
                  break;
                case "私密":
                  setMessage((message) => ({
                    ...message,
                    security: !message.security,
                  }));
                  break;
              }
            }}
          />
        ))}
      </SpeedDial>

      <Dialog open={openLeaveAlert} onClose={() => setOpenLeaveAlert(false)}>
        <DialogTitle>確定要離開?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            我們無法自動儲存您的編輯內容。建議在繼續之前先複製您的文案，以防止意外的資料丟失。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate(-1)}>確定離開</Button>
          <Button onClick={() => setOpenLeaveAlert(false)} autoFocus>
            取消
          </Button>
        </DialogActions>
      </Dialog>
      {message.security && (
        <div className={style.security}>
          <Chip color="primary" icon={<ShieldIcon />} label="私密" />
        </div>
      )}
    </>
  );
}
export default observer(Post);
