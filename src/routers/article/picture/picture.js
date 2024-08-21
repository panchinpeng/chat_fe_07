import { useState, useRef } from "react";
import { Paper, CircularProgress } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import DeleteIcon from "@mui/icons-material/Delete";
import style from "./picture.module.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
export default function Picture({ emitPictureFn }) {
  const [picture, setPicture] = useState([]);
  const files = useRef([]);
  const removePicture = (index) => {
    setPicture((pics) => {
      const cpPics = [...pics];
      cpPics.splice(index, 1);
      files.current.splice(index, 1);
      emitPictureFn([...files.current]);
      return cpPics;
    });
  };
  const handlerImage = (e) => {
    if (e.target.files.length > 0) {
      files.current = [...e.target.files].slice(0, 10);
      emitPictureFn([...files.current]);
      [...files.current]
        .filter((item) => /^image\//.test(item.type))
        .map((item, index) => {
          setPicture((p) => {
            const copyPic = [...p];
            copyPic[index] = "loading";
            return copyPic;
          });
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            setPicture((p) => {
              const copyPic = [...p];
              copyPic[index] = e.target.result;
              return copyPic;
            });
          };
          fileReader.readAsDataURL(item);
        });
    }
  };

  return picture.length === 0 ? (
    <>
      <Paper
        elevation={2}
        sx={{
          width: 1,
          maxWidth: "300px",
          mx: "auto",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label htmlFor="postImg">
          <AddAPhotoIcon sx={{ fontSize: 60 }} />
        </label>
        <input
          type="file"
          id="postImg"
          className={style.file}
          accept="image/*"
          multiple
          onChange={handlerImage}
        ></input>
      </Paper>
      <div className={style.warn}>最多挑選10張照片</div>
    </>
  ) : (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className={style.mySwipper}
      >
        {picture.map((item, index) => (
          <SwiperSlide key={index} className={style.imgWrap}>
            {item === "loading" ? (
              <div className={style.img}>
                <CircularProgress color="secondary"></CircularProgress>
              </div>
            ) : (
              <div className={style.img}>
                <img src={item} width="100%"></img>
                <div className={style.remove}>
                  <DeleteIcon
                    sx={{ fontSize: 30 }}
                    color="error"
                    className={style.removeIcon}
                    onClick={() => removePicture(index)}
                  ></DeleteIcon>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={style.warn}>最多挑選10張照片</div>
    </>
  );
}
