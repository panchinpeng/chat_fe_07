import { Badge, Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { grey } from "@mui/material/colors";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import style from "./avatar.module.css";
import api from "../../common/api";
import Alert from "../alert/alert";
import { useRef, useState } from "react";

function CuAvatar({ from, friendName, friendTrends }) {
  const store = useStore();
  const warnRef = useRef();
  const [avatar, setAvatar] = useState(
    `/api/user/avatar${friendName ? "?username=" + friendName : ""}`
  );
  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1024000) {
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
      setAvatar(`/api/user/avatar?v=${Date.now()}`);
    }
  };

  const computedAvatarClassName = (type) => {
    const styleObj =
      from !== "my"
        ? from === "Index"
          ? { width: 40, height: 40 }
          : { width: 80, height: 80 }
        : { width: 160, height: 160 };

    if (type === "treads") {
      styleObj.width += from === "my" ? 8 : 4;
      styleObj.height += from === "my" ? 8 : 4;
    }
    return styleObj;
  };
  const computedavatarTreadsCLassName = () => {
    if (friendName) {
      return friendTrends * 1 > 0
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
                fontSize: from !== "my" ? 0 : 40,
              }}
            ></AddPhotoAlternateIcon>
          </label>
        }
      >
        <Avatar sx={computedAvatarClassName()}>
          {avatar === "" ? (
            friendName ? (
              friendName.substr(0, 1).toUpperCase()
            ) : (
              store.user.info.username.substr(0, 1).toUpperCase()
            )
          ) : (
            <img
              alt="avatar"
              key={avatar}
              src={avatar}
              onError={() => setAvatar("")}
              height="100%"
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
