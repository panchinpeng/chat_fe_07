import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./userSlide.module.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import Avatar from "../avatar/avatar";
const titles = {
  history: "歷史紀錄",
  new: "最新用戶",
  popular: "熱門用戶",
  online: "活耀度排行",
  article: "貼文數排行",
};
export default function UserSlide({ type, data }) {
  return (
    <>
      <Typography variant="h7" gutterBottom sx={{ mt: 0 }}>
        {titles[type]}
      </Typography>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        freeMode={true}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className={style.wrap}
        breakpoints={{
          460: {
            slidesPerView: 5,
          },
          682: {
            slidesPerView: 6,
          },
        }}
      >
        {data && data.length > 0 ? (
          data.map((username) => (
            <SwiperSlide>
              <div className={style.member}>
                <Avatar from="Index" friendName={username}></Avatar>
                <div>{username}</div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className={style.center}>無紀錄</div>
        )}
      </Swiper>
    </>
  );
}
