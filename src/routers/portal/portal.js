import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  Box,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import style from "./portal.module.css";
import api from "../../common/api";
import Avatar from "../../component/avatar/avatar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
function Portal() {
  const store = useStore();
  const [articles, setArticles] = useState([]);
  const [images, setImages] = useState([]);
  const loadingNextPageDOM = useRef();
  const nowPage = useRef(1);
  const totalPage = useRef();
  useEffect(() => {
    (async () => {
      store.trends.getAllFriendTrends();
      const articlesRes = await api.getArticle(nowPage.current);
      if (articlesRes.status) {
        totalPage.current = articlesRes.data.totalPage;
        setArticles(articlesRes.data.results);
        let observer = new IntersectionObserver(
          async (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              if (totalPage.current <= nowPage.current) {
                return;
              }
              nowPage.current = nowPage.current + 1;
              const articlesNextRes = await api.getArticle(nowPage.current);
              if (articlesNextRes.status) {
                setArticles((articles) => {
                  const existsIds = articles.map((item) => item.id);
                  const excludeRepeatData = articlesNextRes.data.results.filter(
                    (item) => !existsIds.includes(item.id)
                  );
                  return [...articles, ...excludeRepeatData];
                });
              }
            }
          },
          {
            root: document.getElementById("interactionWrap"),
            rootMargin: "0px 0px 100px 0px",
          }
        );
        observer.observe(loadingNextPageDOM.current);
        return () => {
          observer.disconnect();
          observer = null;
        };
      }
    })();
  }, []);

  useEffect(() => {
    if (articles.length) {
      // 先載入動態前兩張圖片
      const preRenderImages = articles.map((article) =>
        article.img_names.slice(0, 2)
      );
      preRenderImages.map((imgs, index) => {
        imgs.map((img, index2) => {
          const imgObj = new Image();
          imgObj.onload = () => {
            setImages((images) => {
              const cpImages = [...images];
              cpImages[index][index2] =
                `${process.env.REACT_APP_API_DOMAIN}/api/article/img?t=${img}`;
              return cpImages;
            });
          };
          imgObj.src = `${process.env.REACT_APP_API_DOMAIN}/api/article/img?t=${img}`;
          return undefined;
        });
        return undefined;
      });
      const loadingImgs = articles.map((article) =>
        new Array(article.img_names.length).fill(0)
      );
      setImages(loadingImgs);
    }
  }, [articles]);

  const renderTime = (time) => {
    const d = new Date(Date.parse(time));
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, 0)}-${d.getDate().toString().padStart(2, 0)} ${d.getHours().toString().padStart(2, 0)}:${d.getMinutes().toString().padStart(2, 0)}`;
  };

  const loadingRestImage = (e, index) => {
    if (
      images[index].filter((item) => item === 0).length === 0 ||
      e.target.dataset.loading === "loading"
    ) {
      return;
    }
    const restImgs = articles[index].img_names.slice(2);
    if (restImgs.length) {
      restImgs.map((img, index2) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          setImages((images) => {
            const cpImages = [...images];
            cpImages[index][index2 + 2] =
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

  return (
    <Box sx={{ padding: "10px" }}>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Card
            sx={{
              width: "calc(100vw - 20px)",
              maxWidth: "500px",
              margin: "10px auto 0 auto",
            }}
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
                </div>
              }
            />

            <CardMedia
              children={
                <div
                  className={style.imageGallery}
                  onScroll={(e) => loadingRestImage(e, index)}
                >
                  {images[index] &&
                    images[index].map((img, index) =>
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
                  <ThumbUpIcon sx={{ mr: 2 }}></ThumbUpIcon>
                  <CommentIcon sx={{ mr: 2 }}></CommentIcon>
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
        ))
      ) : (
        <div className={style.noFriend}>哭哭，沒有好朋友</div>
      )}
      <div ref={loadingNextPageDOM}></div>
    </Box>
  );
}
export default observer(Portal);
