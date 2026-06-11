import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import { useStore } from "./../../store";
import { observer } from "mobx-react-lite";
import api from "./../../common/api";

import recordingImg from "./../../public/recording.png";
import style from "./recording.module.css";
function Recording({ friend, updateMessage }) {
  const store = useStore();
  const [support, setSupport] = useState(false);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  //   const [support, setSupport] = useState(true);
  //   const [recording, setRecording] = useState(true);
  const chunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const countdownTimer = useRef();
  const speak = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (e) {
      if (e.name === "NotFoundError") {
        store.tip.show("找不到麥克風，請確認裝置已連接並授權", "error");
      } else if (e.name === "NotAllowedError") {
        store.tip.show("請允許麥克風權限以使用語音輸入", "error");
      } else {
        store.tip.show("暫時無法使用語音功能", "error");
        console.error(e);
      }
      return;
    }

    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: "audio/webm",
    });
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, {
        type: "audio/webm",
      });
      chunksRef.current = [];

      const formData = new FormData();
      formData.append("file", audioBlob, "voice.webm");
      formData.append("friend", friend);
      const uploadRes = await api.uploadAudio(formData);
      if (uploadRes && uploadRes.status) {
        updateMessage(uploadRes.data);
      }
    };
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
  };
  const unspeak = () => {
    clearInterval(countdownTimer.current);
    mediaRecorderRef.current.stop();
    setRecording(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setSupport(true);
    }
  }, []);
  useEffect(() => {
    if (recording) {
      setCountdown(20);
      countdownTimer.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 0) {
            unspeak();
          } else {
            return c - 1;
          }
        });
      }, 1000);
    }
  }, [recording]);
  if (!support || !friend) {
    return false;
  }
  return (
    <>
      {recording ? (
        <div className={style.recordingWrap}>
          <img src={recordingImg}></img>
          <div className={style.desc}>錄音中 ...</div>
          <div className={style.desc}>{countdown} 秒後，即將結束錄音</div>
          <Button variant="contained" onClick={unspeak}>
            結束
          </Button>
        </div>
      ) : (
        <SettingsVoiceIcon
          sx={{
            fontSize: "30px",
            cursor: "pointer",
            mr: 0.5,
            color: "#575757",
          }}
          onClick={speak}
        ></SettingsVoiceIcon>
      )}
    </>
  );
}
export default observer(Recording);
