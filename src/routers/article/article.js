import { Box, Paper, Switch, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import style from "./article.module.css";
import Picture from "./picture/picture";
import Place from "./place/place";

import usePageLeaveWarn from "../../hooks/usePageLeaveWarn";
import api from "../../common/api";
export default function Article() {
  usePageLeaveWarn();
  const navigate = useNavigate();
  const store = useStore();

  const [message, setMessage] = useState("");
  const place = useRef({}); // 值可能是字串
  const pictureInfo = useRef();
  const [isReply, setIsReply] = useState(true);
  const [isThumb, setIsThumb] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState({ message: false });

  const setPlace = (data) => (place.current = data);

  const submitArticle = async () => {
    if (!message) {
      setError({ message: true });
      return;
    }
    if (pictureInfo.current.longTouchPicture) {
      const userCheck = window.confirm("圖片順序尚未確定，確定要送出嗎");
      if (!userCheck) {
        return;
      }
    }
    const images = pictureInfo.current.getPictures();
    if (images.length === 0) {
      alert("請至少選擇一張照片");
      return;
    }
    store.loading.setLoading(true);
    // 如果區域找不到，替換成物件
    if (typeof place.current === "string") {
      place.current = { name: place.current };
    }

    const postResult = await api.addPostArticle(
      message,
      place.current,
      isReply,
      isThumb,
      store.user.account.public * 1 > 0 ? isPrivate : true,
      images,
      1
    );
    store.loading.setLoading(false);
    if (postResult.status) {
      window.passLeavePrompt = true;
      navigate("/");
      setTimeout(() => {
        window.passLeavePrompt = false;
      }, 1000);
    }
  };

  return (
    <Box sx={{ p: 1, width: 1 }} className={style.wrap}>
      <Paper elevation="1" sx={{ pt: 5 }}>
        <Picture ref={pictureInfo}></Picture>
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
          <div className={style.tip}>發佈貼文後，將允許留言</div>
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
          <div className={style.tip}>發佈貼文後，允許按讚</div>
        </Box>
        {store.user.account.public > 0 && (
          <Box
            sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}
          >
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
        )}

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
