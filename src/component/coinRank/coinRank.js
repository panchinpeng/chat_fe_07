import { Box, Avatar } from "@mui/material";
import style from "./coinRank.module.css";
export default function CoinRank() {
  return (
    <Box sx={{ width: "800px", pt: "80px" }} className={style.rankWrap}>
      <div className={style.winner}>
        <Avatar
          src="https://picsum.photos/id/237/200/300"
          className={`${style.player} ${style.second}`}
        >
          N
        </Avatar>
        <Avatar
          src="https://picsum.photos/id/237/200/300"
          className={`${style.player} ${style.first}`}
        >
          N
        </Avatar>
        <Avatar
          src="https://picsum.photos/id/237/200/300"
          className={`${style.player} ${style.third}`}
        >
          N
        </Avatar>
      </div>

      <div className={style.stage}></div>
    </Box>
  );
}
