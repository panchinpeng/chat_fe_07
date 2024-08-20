import {
  Box,
  Paper,
  Switch,
  Button,
  CircularProgress,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import style from "./article.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import api from "../../common/api";

export default function Article() {
  const [message, setMessage] = useState("");
  const [activePicture, setActivePicture] = useState(0);
  const [picture, setPicture] = useState([]);
  const [places, setPlaces] = useState([]);
  const srarchPlaceDeboundRef = useRef();

  const handlerImage = (e) => {
    if (e.target.files.length > 0) {
      [...e.target.files]
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
  const removePicture = (index) => {
    setPicture((pics) => {
      const cpPics = [...pics];
      cpPics.splice(index, 1);
      return cpPics;
    });
  };
  const handlePlaceChange = (e) => {
    setPlaces("loading");
    clearTimeout(srarchPlaceDeboundRef.current);
    srarchPlaceDeboundRef.current = setTimeout(async () => {
      if (e.target.value) {
        const places = await api.searchPlace(e.target.value);
      }
    }, 2000);
  };

  return (
    <Box sx={{ p: 1, width: 1 }} className={style.wrap}>
      <Paper elevation="1" sx={{ pt: 5 }}>
        {picture.length === 0 ? (
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
        ) : (
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
        )}

        <Box sx={{ mt: 6, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <TextField
            label="想分享些甚麼"
            multiline
            maxRows={8}
            variant="standard"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <TextField
            label="標記地點"
            variant="standard"
            color="primary"
            placeholder="請輸入關鍵字"
            fullWidth
            onChange={handlePlaceChange}
          />
          <List dense={true}>
            {places === "loading" && (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress color="secondary"></CircularProgress>
              </Box>
            )}
            {places.length > 0 &&
              places.map &&
              places.map((place) => (
                <ListItem disablePadding key={place.id}>
                  <ListItemButton>
                    <ListItemIcon>
                      <FmdGoodIcon></FmdGoodIcon>
                    </ListItemIcon>
                    <ListItemText>高雄</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
        <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <div>
            開放回覆
            <Switch defaultChecked />
          </div>
          <div className={style.tip}>當發佈貼文後，將允許好友留言</div>
        </Box>
        <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <div>
            開放按讚
            <Switch defaultChecked />
          </div>
          <div className={style.tip}>當發佈貼文後，將允許好友按讚</div>
        </Box>
        <Box sx={{ mt: 1, p: 1, fontSize: 16, borderBottom: "1px solid #ccc" }}>
          <div>
            僅允許好友看見
            <Switch defaultChecked />
          </div>
          <div className={style.tip}>
            選擇僅好友看見時，僅開放好友互動，其他人看不見唷
          </div>
        </Box>
        <Box sx={{ mt: 1, textAlign: "right", p: 1, fontSize: 16 }}>
          <Button variant="contained" color="error">
            儲存草稿
          </Button>
          <Button variant="contained" sx={{ ml: 3 }}>
            發佈
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
