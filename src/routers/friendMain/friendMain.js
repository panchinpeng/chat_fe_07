import { Box, Grid } from "@mui/material";
import style from "./friendMain.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../../common/api";
import man from "./../../public/man.png";
import PostArticle from "../../component/postArticle/postArticle";
import useIntersectionObserver from "./../../hooks/useIntersectionObserver.js";
export default function FriendMain() {
  const navigate = useNavigate();
  const { user } = useParams();
  const nowPage = useRef(1);
  const totalPage = useRef();
  const loadingNextPageDOM = useRef();
  const maxArticleId = useRef(0);
  const [articles, setArticles] = useState([]);
  const { startObserve, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (articles.length) {
      maxArticleId.current = articles[articles.length - 1].id;
    }
  }, [articles]);
  useEffect(() => {
    (async () => {
      const articlesRes = await api.getArticle(user);
      if (!articlesRes.status) {
        alert("發生錯誤");
        navigate("/");
        return;
      }
      if (articlesRes.data.results.length) {
        totalPage.current = articlesRes.data.totalPage;
        setArticles(articlesRes.data.results);
        startObserve(loadingNextPageDOM.current);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (isIntersecting) {
        if (totalPage.current <= nowPage.current) {
          return;
        }
        nowPage.current = nowPage.current + 1;
        const articlesNextRes = await api.getArticle(
          user,
          maxArticleId.current
        );
        if (articlesNextRes.status) {
          setArticles((articles) => [
            ...articles,
            ...articlesNextRes.data.results,
          ]);
        }
      }
    })();
  }, [isIntersecting]);

  return (
    <Box className={style.wrap}>
      <div className={style.picWrap}>
        <img
          width="100%"
          src={`${process.env.REACT_APP_API_DOMAIN}/api/user/avatar?username=${user}`}
          onError={(e) => (e.target.src = man)}
          className={style.pic}
        ></img>
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

      <Box sx={{ p: 1, maxWidth: "960px", margin: "auto" }}>
        <Grid container spacing={2}>
          {articles.length > 0 ? (
            articles.map((article) => (
              <Grid item md={4} xs={12} key={article.id}>
                <PostArticle article={article}></PostArticle>
              </Grid>
            ))
          ) : (
            <div className={style.empty}>很懶 ... 沒有任何貼文</div>
          )}
        </Grid>
        <div ref={loadingNextPageDOM}></div>
      </Box>
    </Box>
  );
}
