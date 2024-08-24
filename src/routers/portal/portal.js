import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  Box,
  CardContent,
  Typography,
} from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import style from "./portal.module.css";
import api from "../../common/api";
import Avatar from "../../component/avatar/avatar";
export default function Portal() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    (async () => {
      const articlesRes = await api.getArticle();
      if (articlesRes.status) {
        setArticles(articlesRes.data);
      }
    })();
  }, []);
  const renderTime = (time) => {
    const d = new Date(Date.parse(time));
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, 0)}-${d.getDate().toString().padStart(2, 0)} ${d.getHours().toString().padStart(2, 0)}:${d.getMinutes().toString().padStart(2, 0)}`;
  };
  return (
    <Box sx={{ padding: "10px" }}>
      {articles.map((article) => (
        <Card
          sx={{ width: "100%", maxWidth: "360px", margin: "10px auto 0 auto" }}
        >
          <CardHeader
            avatar={
              <Avatar from="Index" friendName={article.username}></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={article.username}
            subheader={
              <div className={style.subheader}>
                <div>{renderTime(article.time)}</div>
                {/* <div className={style.address}>
                  <FmdGoodIcon sx={{ fontSize: "14px" }}></FmdGoodIcon>
                  wefwefew
                </div> */}
              </div>
            }
          />

          <CardMedia
            children={
              <div className={style.imageGallery}>
                {article.img_names.map((img) => (
                  <img
                    className={style.articleImg}
                    key={img}
                    src={`${process.env.REACT_APP_API_DOMAIN}/api/article/img?t=${img}`}
                    height="320px"
                  ></img>
                ))}
              </div>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <div className={style.interactive}>
                <ThumbUpIcon sx={{ mr: 2 }}></ThumbUpIcon>
                <CommentIcon sx={{ mr: 2 }}></CommentIcon>
                <a
                  target="_BLANK"
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
      ))}
    </Box>
  );
}
