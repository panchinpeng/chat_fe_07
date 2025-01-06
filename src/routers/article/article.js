import { Box, Switch, Button, TextField } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import style from "./article.module.css";
import Picture from "./picture/picture";
import Place from "./place/place";
import usePageLeaveWarn from "../../hooks/usePageLeaveWarn";
import api from "../../common/api";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Draft from "../../component/draft/draft";
import Alert from "../../component/alert/alert";
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
  const [draft, setDraft] = useState([]);
  const [error, setError] = useState({ message: false });
  const [openDraft, setOpenDraft] = useState(false);
  const [draftData, setDraftData] = useState(undefined);
  const alertRef = useRef();

  const setPlace = (data) => (place.current = data);

  const submitDraft = async () => {
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
    const selectImagesLength = pictureInfo.current.getPicturesLength();
    if (selectImagesLength === 0) {
      alertRef.current.setMessage("請選擇一張照片");
      alertRef.current.setSeverity("error");
      return;
    }
    store.loading.setLoading(true);
    // 如果區域找不到，替換成物件
    if (typeof place.current === "string") {
      place.current = { name: place.current };
    }

    const sortData = pictureInfo.current.getSort();

    const postResult = await api.addPostArticle(
      message,
      place.current,
      isReply,
      isThumb,
      store.user.account.public * 1 > 0 ? isPrivate : true,
      images,
      sortData,
      0
    );
    store.loading.setLoading(false);
    if (postResult && postResult.status) {
      alertRef.current.setMessage("已成功儲存草稿");
      alertRef.current.setSeverity("success");
    }
  };

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
    const selectImagesLength = pictureInfo.current.getPicturesLength();
    if (selectImagesLength === 0) {
      alertRef.current.setMessage("請選擇一張照片");
      alertRef.current.setSeverity("error");
      return;
    }
    store.loading.setLoading(true);
    // 如果區域找不到，替換成物件
    if (typeof place.current === "string") {
      place.current = { name: place.current };
    }
    const sortData = pictureInfo.current.getSort();
    const postResult = await api.addPostArticle(
      message,
      place.current,
      isReply,
      isThumb,
      store.user.account.public * 1 > 0 ? isPrivate : true,
      images,
      sortData,
      1,
      draftData ? draftData.id : undefined
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

  useEffect(() => {
    (async () => {
      const res = await api.getArticleDraft();
      if (res.status && res.data) {
        setDraft(res.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (draftData) {
      setMessage(draftData.message);
      setIsReply(draftData.is_reply * 1 === 1);
      setIsThumb(draftData.is_thumb * 1 === 1);
      setIsPrivate(draftData.is_private * 1 === 1);
    }
  }, [draftData]);

  return (
    <Box sx={{ p: 1, width: 1 }} className={style.wrap}>
      {draft.length > 0 && (
        <div className={style.draft} onClick={() => setOpenDraft(true)}>
          <DriveFileRenameOutlineIcon
            fontSize="large"
            color="primary"
          ></DriveFileRenameOutlineIcon>
          <div>草稿</div>
        </div>
      )}
      <Draft
        open={openDraft}
        setOpen={setOpenDraft}
        draft={draft}
        setDraft={setDraft}
        setDraftData={setDraftData}
      ></Draft>
      <Picture
        ref={pictureInfo}
        draftImages={
          draftData && draftData.img_names ? draftData.img_names : ""
        }
      ></Picture>
      <div className={style.line}></div>
      <Box sx={{ mt: 3, p: 1 }}>
        <TextField
          error={error.message}
          helperText={error.message ? "請輸入內容" : ""}
          required
          label="想分享些甚麼"
          multiline
          maxRows={8}
          fullWidth
          value={message}
          variant="standard"
          onInput={(e) => setMessage(e.target.value)}
        />
      </Box>
      <Place
        emitSelectPlaceFn={setPlace}
        draftPlace={draftData ? draftData.place : undefined}
      ></Place>
      <Box sx={{ mt: 1, p: 1 }}>
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
      <Box sx={{ mt: 1, p: 1 }}>
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
        <Box sx={{ mt: 1, p: 1 }}>
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

      <Box sx={{ mt: 1, textAlign: "right", p: 1 }}>
        {!draftData && (
          <Button variant="contained" color="error" onClick={submitDraft}>
            儲存草稿
          </Button>
        )}
        <Button variant="contained" sx={{ ml: 3 }} onClick={submitArticle}>
          發佈
        </Button>
      </Box>
      <Alert ref={alertRef} severity="success"></Alert>
    </Box>
  );
}
