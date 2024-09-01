import { Box } from "@mui/material";
import style from "./friendMain.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../../common/api";
import man from "./../../public/man.png";
import PortArticle from "../../component/postArticle/postArticle";
export default function FriendMain() {
  const navigate = useNavigate();
  const { user } = useParams();
  const nowPage = useRef(1);
  const totalPage = useRef();
  const loadingNextPageDOM = useRef();
  const maxArticleId = useRef(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (articles.length) {
      maxArticleId.current = articles[articles.length - 1].id;
    }
  }, [articles]);
  useEffect(() => {
    let observer = null;
    (async () => {
      const articlesRes = await api.getArticle(user);
      if (!articlesRes.status) {
        alert("發生錯誤");
        navigate("/");
        return;
      }
      totalPage.current = articlesRes.data.totalPage;
      setArticles(articlesRes.data.results);
      observer = new IntersectionObserver(
        async (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
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
        },
        {
          root: document.getElementById("interactionWrap"),
          rootMargin: "0px 0px 100px 0px",
        }
      );
      observer.observe(loadingNextPageDOM.current);
    })();
    return () => {
      observer && observer.disconnect();
      observer = null;
    };
  }, [user]);
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
      <Box sx={{ p: 1 }}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <PortArticle key={article.id} article={article}></PortArticle>
          ))
        ) : (
          <div className={style.empty}>很懶 ... 沒有任何貼文</div>
        )}
        <div ref={loadingNextPageDOM}></div>
      </Box>
    </Box>
  );
}
