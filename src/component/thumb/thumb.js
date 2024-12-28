import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import api from "../../common/api";
import style from "./thumb.module.css";

export default function Thumb({
  articleID,
  show,
  selfArticle,
  thumbNum,
  hasBeenThumb,
}) {
  const [isActive, setIsActive] = useState(hasBeenThumb * 1 === 1);
  const [thumbSum, setThumbSum] = useState(thumbNum);

  const doThumb = async () => {
    if (isActive) {
      return;
    }
    if (selfArticle) {
      alert("不可以按讚自己的貼文唷");
      return;
    }

    const res = await api.setThumb(articleID);
    if (res) {
      setThumbSum((thumbSum) => thumbSum + 1);
      setIsActive(res);
    }
  };
  return (
    show * 1 === 1 && (
      <div className={style.thumbWrap}>
        <ThumbUpIcon
          sx={{ mr: 1, color: isActive ? "#1976d2" : "" }}
          onClick={doThumb}
        ></ThumbUpIcon>
        <span>{thumbSum}</span>
      </div>
    )
  );
}
