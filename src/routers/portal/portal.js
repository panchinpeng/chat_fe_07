import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import style from "./portal.module.css";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import PortArticle from "../../component/postArticle/postArticle";
function Portal() {
  const store = useStore();
  const [articles, setArticles] = useState([]);
  const loadingNextPageDOM = useRef();
  const nowPage = useRef(1);
  const totalPage = useRef();
  useEffect(() => {
    let observer = null;
    (async () => {
      store.trends.getAllFriendTrends();
      const articlesRes = await api.getArticle(nowPage.current);
      if (articlesRes.status) {
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
      }
    })();
    return () => {
      observer && observer.disconnect();
      observer = null;
    };
  }, []);

  return (
    <Box sx={{ padding: "10px" }}>
      {articles.length > 0 ? (
        articles.map((article) => (
          <PortArticle key={article.id} article={article}></PortArticle>
        ))
      ) : (
        <div className={style.noFriend}>哭哭，沒有好朋友</div>
      )}
      <div ref={loadingNextPageDOM}></div>
    </Box>
  );
}
export default observer(Portal);
