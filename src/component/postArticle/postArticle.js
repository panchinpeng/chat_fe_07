import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";
import Avatar from "../avatar/avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

import style from "./postArticle.module.css";
import { useEffect, useState } from "react";
import Thumb from "../thumb/thumb";

export default function PortArticle({ article }) {
  const [images, setImages] = useState(() =>
    article ? new Array(article.img_names.length).fill(0) : []
  );
  const renderTime = (time) => {
    const d = new Date(Date.parse(time));
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, 0)}-${d.getDate().toString().padStart(2, 0)} ${d.getHours().toString().padStart(2, 0)}:${d.getMinutes().toString().padStart(2, 0)}`;
  };
  const loadingRestImage = (e) => {
    if (
      images.filter((item) => item === 0).length === 0 ||
      e.target.dataset.loading === "loading"
    ) {
      return;
    }
    const restImgs = article.img_names.slice(2);
    if (restImgs.length) {
      restImgs.map((img, index) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          setImages((images) => {
            const cpImages = [...images];
            cpImages[index + 2] =
              `${process.env.REACT_APP_API_DOMAIN}/api/article/img?t=${img}`;
            return cpImages;
          });
        };
        imgObj.src = `${process.env.REACT_APP_API_DOMAIN}/api/article/img?t=${img}`;
        return undefined;
      });
    }
    e.target.dataset.loading = "loading";
  };

  useEffect(() => {
    if (article) {
      // 先載入動態前兩張圖片
      const preRenderImages = article.img_names.slice(0, 2);
      preRenderImages.map((img, index) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          setImages((images) => {
            const cpImages = [...images];
            cpImages[index] =
              `${process.env.REACT_APP_API_DOMAIN}/api/article/img?t=${img}`;
            return cpImages;
          });
        };
        imgObj.src = `${process.env.REACT_APP_API_DOMAIN}/api/article/img?t=${img}`;
        return undefined;
      });
    }
  }, []);

  return (
    <Card
      sx={{
        width: "calc(100vw - 20px)",
        maxWidth: "500px",
        margin: "10px auto 0 auto",
      }}
    >
      <CardHeader
        avatar={<Avatar from="Index" friendName={article.username}></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.username}
        subheader={
          <div className={style.subheader}>
            <div>{renderTime(article.time)}</div>
          </div>
        }
      />

      <CardMedia
        children={
          <div
            className={style.imageGallery}
            onScroll={(e) => loadingRestImage(e)}
          >
            {images &&
              images.map((img, index) =>
                img === 0 ? (
                  <Skeleton
                    key={index}
                    animation="wave"
                    sx={{
                      height: "320px",
                      width: "300px",
                      transform: "none",
                      flex: "0 0 300px",
                    }}
                    className={style.articleImg}
                  />
                ) : (
                  <img
                    className={style.articleImg}
                    key={img}
                    src={img}
                    height="320px"
                    alt="article picture"
                  ></img>
                )
              )}
          </div>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <div className={style.interactive}>
            <Thumb
              articleID={article.id}
              show={article.is_thumb * 1 === 1}
            ></Thumb>

            {article.is_reply * 1 === 1 && (
              <CommentIcon sx={{ mr: 2 }}></CommentIcon>
            )}

            <a
              target="_BLANK"
              rel="noreferrer"
              className={style.address}
              href={`https://www.google.com/maps/dir//google+map+${article.place.name}`}
            >
              <FmdGoodIcon sx={{ fontSize: "13px" }}></FmdGoodIcon>
              <div className={style.addressDetail}>
                <div className={style.nowrap}>{article.place.name}</div>
              </div>
            </a>
          </div>
          <div className={style.message}>{article.message}</div>
        </Typography>
      </CardContent>
    </Card>
  );
}
