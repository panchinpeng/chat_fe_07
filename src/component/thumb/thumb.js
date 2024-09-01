import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import api from "../../common/api";
import style from "./thumb.module.css";

export default function Thumb({ articleID, show }) {
  const [isActive, setIsActive] = useState(false);
  const [thumbSum, setThumbSum] = useState(0);
  useEffect(() => {
    (async () => {
      if (show) {
        const res = await api.getThumb(articleID);
        if (res && res.status) {
          setThumbSum(res.data.sum);
          setIsActive(res.data.isThumb);
        }
      }
    })();
  }, [show]);
  const doThumb = async () => {
    if (isActive) {
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
