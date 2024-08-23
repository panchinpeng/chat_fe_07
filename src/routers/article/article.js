import { Box, Paper, Switch, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

import style from "./article.module.css";
import Picture from "./picture/picture";
import Place from "./place/place";
import { useEffect } from "react";

import usePageLeaveWarn from "../../hooks/usePageLeaveWarn";

export default function Article() {
  const [message, setMessage] = useState("");
  const place = useRef({}); // 值可能是字串
  const picture = useRef([]);
  const [isReply, setIsReply] = useState(true);
  const [isThumb, setIsThumb] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState({ message: false });

  const setPlace = (data) => (place.current = data);
  const setPicture = (data) => (picture.current = data);

  usePageLeaveWarn();

  const submitArticle = () => {
    if (!message) {
      setError({ message: true });
    }
  };

  return (
    <Box sx={{ p: 1, width: 1 }} className={style.wrap}>
      <Paper elevation="1" sx={{ pt: 5 }}>
        <Picture emitPictureFn={setPicture}></Picture>
        <Box sx={{ mt: 6, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <TextField
            error={error.message}
            helperText={error.message ? "請輸入內容" : ""}
            required
            label="想分享些甚麼"
            multiline
            maxRows={8}
            variant="standard"
            fullWidth
            value={message}
            onInput={(e) => setMessage(e.target.value)}
          />
        </Box>
        <Place emitSelectPlaceFn={setPlace}></Place>
        <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <div>
            開放回覆
            <Switch
              defaultChecked
              checked={isReply}
              onChange={(e) => setIsReply(e.target.checked)}
            />
          </div>
          <div className={style.tip}>當發佈貼文後，將允許好友留言</div>
        </Box>
        <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <div>
            開放按讚
            <Switch
              defaultChecked
              checked={isThumb}
              onChange={(e) => setIsThumb(e.target.checked)}
            />
          </div>
          <div className={style.tip}>當發佈貼文後，將允許好友按讚</div>
        </Box>
        <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <div>
            僅允許好友看見
            <Switch
              defaultChecked
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </div>
          <div className={style.tip}>
            選擇僅好友看見時，僅開放好友互動，其他人看不見唷
          </div>
        </Box>
        <Box sx={{ mt: 1, textAlign: "right", p: 1, fontSize: 16 }}>
          <Button variant="contained" color="error">
            儲存草稿
          </Button>
          <Button variant="contained" sx={{ ml: 3 }} onClick={submitArticle}>
            發佈
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
