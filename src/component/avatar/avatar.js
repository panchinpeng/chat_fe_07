import { Badge, Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { grey } from "@mui/material/colors";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import style from "./avatar.module.css";
import api from "../../common/api";
import Alert from "../alert/alert";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function CuAvatar({ from, friendName }) {
  const navigate = useNavigate();
  const store = useStore();
  const warnRef = useRef();
  const [avatar, setAvatar] = useState(
    `${process.env.REACT_APP_API_DOMAIN}/api/user/avatar${friendName ? "?username=" + friendName : ""}`
  );
  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (file.size > 10024000) {
      warnRef.current.setMessage("file to large");
      return;
    }
    if (!/image\/*/.test(file.type)) {
      warnRef.current.setMessage("file type must images");
      return;
    }

    const fd = new FormData();
    fd.append("images", file);
    fd.append("type", "image");
    const res = await api.setAvatar(fd);
    if (res.status) {
      setAvatar(
        `${process.env.REACT_APP_API_DOMAIN}/api/user/avatar?v=${Date.now()}`
      );
    }
  };

  const computedAvatarClassName = (type) => {
    const styleObj =
      from !== "my"
        ? from === "Index"
          ? { width: 40, height: 40 }
          : { width: 80, height: 80 }
        : { width: 160, height: 160 };
    if (from === "Message") {
      styleObj.width = 30;
      styleObj.height = 30;
    }
    if (type === "treads") {
      styleObj.width += from === "my" ? 8 : 4;
      styleObj.height += from === "my" ? 8 : 4;
    }
    return styleObj;
  };
  const computedavatarTreadsCLassName = () => {
    if (friendName) {
      const friendInfo = store.trends.friendTrends.find(
        (friend) => friend.username === friendName
      );
      return friendInfo && friendInfo.readed * 1 === 0
        ? `${style.avatarTreads} ${from === "my" ? style.big : ""}`
        : "";
    } else {
      return store.user.account.trends > 0
        ? `${style.avatarTreads} ${from === "my" ? style.big : ""}`
        : "";
    }
  };
  return (
    <>
      <Alert ref={warnRef} severity="error"></Alert>
      <Badge
        overlap="circular"
        sx={computedAvatarClassName("treads")}
        className={computedavatarTreadsCLassName()}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <label htmlFor="uploadAvatarmy">
            <AddPhotoAlternateIcon
              sx={{
                color: grey[900],
                fontSize: from !== "my" ? 0 : "40px !important",
              }}
            ></AddPhotoAlternateIcon>
          </label>
        }
      >
        <Avatar
          sx={computedAvatarClassName()}
          onClick={async () => {
            const getTrendRes = await store.trends.getTrend(
              friendName ? friendName : store.user.account.username
            );
            if (getTrendRes === "noTrend") {
              navigate(
                `/member/friendMain/${friendName ? friendName : store.user.account.username}`
              );
            }
          }}
        >
          {avatar === "" ? (
            friendName ? (
              friendName.substr(0, 1).toUpperCase()
            ) : (
              store.user.account.username.substr(0, 1).toUpperCase()
            )
          ) : (
            <img
              alt="avatar"
              key={avatar}
              src={avatar}
              onError={() => setAvatar("")}
              width="100%"
            ></img>
          )}
        </Avatar>
        {from === "my" && (
          <input
            type="file"
            id={`uploadAvatar${from}`}
            className={style.hide}
            onChange={handleAvatar}
            accept="image/*"
          ></input>
        )}
      </Badge>
    </>
  );
}

export default observer(CuAvatar);
