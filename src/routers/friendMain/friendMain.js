import { Box } from "@mui/material";
import style from "./friendMain.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import man from "./../../public/man.png";
export default function FriendMain() {
  const { user } = useParams();
  useEffect(() => {}, [user]);
  return (
    <Box className={style.wrap}>
      <div className={style.picWrap}>
        <img width="100%" src={man} className={style.pic}></img>
        <div className={style.name}>{user}</div>
        <div className={style.statistics}>
          <div>
            <div>貼文數</div>
            <div>36</div>
          </div>
          <div>
            <div>動態數</div>
            <div>258</div>
          </div>
          <div>
            <div>金幣</div>
            <div>3655</div>
          </div>
          <div>
            <div>活耀度</div>
            <div>100</div>
          </div>
        </div>
      </div>
    </Box>
  );
}
