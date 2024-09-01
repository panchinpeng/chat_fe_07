import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import style from "./portal.module.css";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import PortArticle from "../../component/postArticle/postArticle";
import RecommendArticle from "../../component/recommendArticle/recommendArticle";
function Portal() {
  const store = useStore();
  const [articles, setArticles] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const loadingNextPageDOM = useRef();
  const nowPage = useRef(1);
  const totalPage = useRef(null);
  const maxArticleId = useRef(0);

  useEffect(() => {
    if (articles.length) {
      maxArticleId.current = articles[articles.length - 1].id;
    }
  }, [articles]);

  useEffect(() => {
    let observer = null;
    (async () => {
      store.trends.getAllFriendTrends();
      const articlesRes = await api.getArticle();
      if (articlesRes.status) {
        totalPage.current = articlesRes.data.totalPage;
        setArticles(articlesRes.data.results);
        observer = new IntersectionObserver(
          async (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              if (totalPage.current <= nowPage.current) {
                setIsEnd(true);
                observer.disconnect();
                return;
              }
              nowPage.current = nowPage.current + 1;
              const articlesNextRes = await api.getArticle(
                undefined,
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
      }
    })();
    return () => {
      observer && observer.disconnect();
      observer = null;
    };
  }, []);

  return (
    <Box sx={{ padding: "10px" }}>
      {articles.map((article) => (
        <PortArticle key={article.id} article={article}></PortArticle>
      ))}
      {nowPage.current === totalPage.current && (
        <div className={style.friendEnd}>已看完所有好友動態</div>
      )}
      {isEnd && <RecommendArticle></RecommendArticle>}
      <div ref={loadingNextPageDOM}></div>
    </Box>
  );
}
export default observer(Portal);
