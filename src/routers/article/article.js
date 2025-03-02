import {
  Box,
  Switch,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  DialogActions,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import style from "./article.module.css";
import Picture from "./picture/picture";
import Place from "./place/place";
import usePageLeaveWarn from "../../hooks/usePageLeaveWarn";
import api from "../../common/api";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import Draft from "../../component/draft/draft";
import Alert from "../../component/alert/alert";
import CreateIcon from "@mui/icons-material/Create";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PeopleIcon from "@mui/icons-material/People";
import PlaceIcon from "@mui/icons-material/Place";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import TagFriend from "./tagFriend/tagFriend";
import UserSlide from "./../../component/userSlide/userSlide";
const edits = [
  { name: "分享些甚麼", icon: <CreateIcon></CreateIcon> },
  { name: "標記地點", icon: <PlaceIcon></PlaceIcon> },
  { name: "標記朋友", icon: <PeopleIcon></PeopleIcon> },
  { name: "開放回覆", icon: <ReplyIcon></ReplyIcon>, switch: true },
  { name: "開放按讚", icon: <ThumbUpIcon></ThumbUpIcon>, switch: true },
  {
    name: "只允許好友看見",
    icon: <EnhancedEncryptionIcon></EnhancedEncryptionIcon>,
    switch: true,
    tip: "帳號不開放被搜尋時預設只允許好友看見文章",
  },
];

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function Article() {
  usePageLeaveWarn();
  const navigate = useNavigate();
  const store = useStore();

  const [message, setMessage] = useState("");
  const place = useRef(""); // 值可能是字串
  const pictureInfo = useRef();
  const [isReply, setIsReply] = useState(true);
  const [isThumb, setIsThumb] = useState(true);
  const [isPrivate, setIsPrivate] = useState(() =>
    store.user.account.public * 1 > 0 ? false : true
  );
  const [draft, setDraft] = useState([]);
  const [openDraft, setOpenDraft] = useState(false);
  const [draftData, setDraftData] = useState(undefined);
  const [editStatus, setEditStatus] = useState(null);
  const [tagFriends, setTagFriends] = useState([]);
  const alertRef = useRef();

  const setPlace = (data) => (place.current = data);

  const submitDraft = async () => {
    if (!message) {
      alertRef.current.setMessage("分享內容不能空白");
      alertRef.current.setSeverity("error");
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
      tagFriends,
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
      alertRef.current.setMessage("分享內容不能空白");
      alertRef.current.setSeverity("error");
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
      tagFriends,
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

  const renderSwitchChecked = (editStatus) => {
    if (editStatus === "開放回覆") {
      return isReply;
    } else if (editStatus === "開放按讚") {
      return isThumb;
    } else if (editStatus === "只允許好友看見") {
      return isPrivate;
    }
  };
  const switchChange = (editStatus) => {
    if (editStatus === "開放回覆") {
      setIsReply((r) => !r);
    } else if (editStatus === "開放按讚") {
      setIsThumb((t) => !t);
    } else if (editStatus === "只允許好友看見") {
      setIsPrivate((p) => !p);
    }
  };

  const renderEditConent = (editStatus) => {
    if (editStatus === "分享些甚麼") {
      return (
        <TextField
          required
          multiline
          fullWidth
          minRows={10}
          value={message}
          variant="standard"
          onInput={(e) => setMessage(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          autoFocus
          placeholder="輸入內容..."
        />
      );
    } else if (editStatus === "標記地點") {
      return (
        <Place
          emitSelectPlaceFn={setPlace}
          draftPlace={
            draftData
              ? draftData.place
              : place.current
                ? place.current
                : undefined
          }
        ></Place>
      );
    } else if (editStatus === "標記朋友") {
      return (
        <TagFriend
          setSelectFriends={setTagFriends}
          selectFriends={tagFriends}
        ></TagFriend>
      );
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
      place.current = draftData.place;
      console.log(draftData);
      if (draftData.users) {
        const friendData = draftData.users.split(",");
        setTagFriends(friendData);
      }
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
      <Box sx={{ marginTop: "20px" }}>
        <List component="nav" sx={{ width: "100%" }}>
          {edits.map((edit) => (
            <>
              <ListItem
                key={edit.name}
                sx={{ p: 0 }}
                className={
                  edit.name === "只允許好友看見" &&
                  store.user.account.public * 1 === 0
                    ? style.disabled
                    : ""
                }
              >
                <ListItemButton
                  sx={{ padding: "10px 0" }}
                  onClick={edit.switch ? null : () => setEditStatus(edit.name)}
                >
                  <ListItemIcon className={style.icon}>
                    {edit.icon}
                  </ListItemIcon>
                  <ListItemText
                    id={`switch-list-label-${edit.name}`}
                    primary={edit.name}
                    className={style.inputTitle}
                    // secondary={edit.tip}
                  />

                  {edit.switch && (
                    <div className={style.switch}>
                      <Switch
                        edge="end"
                        disabled={
                          edit.name === "只允許好友看見" &&
                          store.user.account.public * 1 === 0
                        }
                        defaultChecked
                        checked={renderSwitchChecked(edit.name)}
                        onChange={() => switchChange(edit.name)}
                        inputProps={{
                          "aria-labelledby": `switch-list-label-${edit.name}`,
                        }}
                      />
                    </div>
                  )}
                </ListItemButton>
              </ListItem>
              {edit.tip && <div className={style.fieldTip}>{edit.tip}</div>}
              {edit.name === "分享些甚麼" && message && (
                <div className={style.fillContent}>{message}</div>
              )}
              {edit.name === "標記地點" && place.current && (
                <div className={style.fillContent}>{place.current.name}</div>
              )}
              {edit.name === "標記朋友" && tagFriends.length > 0 && (
                <div className={style.fillContent}>
                  <UserSlide
                    type="friend"
                    data={tagFriends}
                    disableHeader
                    onClick={() => {}}
                  ></UserSlide>
                </div>
              )}
            </>
          ))}
        </List>
      </Box>
      <Dialog
        open={!!editStatus}
        TransitionComponent={Transition}
        fullWidth
        fullScreen
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 0, // 固定在底部
            left: 0,
            right: 0,
            height: "50vh", // 設置高度為視窗一半
            borderTopLeftRadius: 16, // 圓角
            borderTopRightRadius: 16,
            boxShadow: 3, // 添加陰影
          },
        }}
      >
        <DialogTitle>{editStatus}</DialogTitle>
        <DialogContent>{renderEditConent(editStatus)}</DialogContent>
        <DialogActions>
          <Button onClick={() => setEditStatus(null)}>確定</Button>
        </DialogActions>
      </Dialog>
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
