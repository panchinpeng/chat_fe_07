import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import style from "./portal.module.css";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import PostArticle from "../../component/postArticle/postArticle";
import RecommendArticle from "../../component/recommendArticle/recommendArticle";
import Masonry from "masonry-layout";
import useIntersectionObserver from "./../../hooks/useIntersectionObserver.js";

function Portal() {
  const store = useStore();
  const [articles, setArticles] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const loadingNextPageDOM = useRef();
  const nowPage = useRef(1);
  const totalPage = useRef(null);
  const maxArticleId = useRef(0);
  const [masonry, setMasonry] = useState(null);

  const { startObserve, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (articles.length) {
      maxArticleId.current = articles[articles.length - 1].id;
      setMasonry(
        new Masonry(
          document.querySelector(".waterFall", {
            columnWidth: 300,
            itemSelector: ".waterFallItem",
            gutter: 10,
          })
        )
      );
    }
  }, [articles]);

  useEffect(() => {
    setTimeout(() => {
      if (masonry) {
        masonry.layout();
      }
    }, 200);
  }, [masonry]);

  useEffect(() => {
    (async () => {
      store.trends.getAllFriendTrends();
      const articlesRes = await api.getArticle();

      if (articlesRes.data.results.length) {
        totalPage.current = articlesRes.data.totalPage;
        setArticles(articlesRes.data.results);
        startObserve(loadingNextPageDOM.current);
      } else {
        setIsEnd(true);
      }
    })();
    return () => {
      masonry && masonry.destroy();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (isIntersecting) {
        if (totalPage.current <= nowPage.current) {
          setIsEnd(true);
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
    })();
  }, [isIntersecting]);

  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "16px",
        "@media (min-width: 960px)": {
          width: "960px",
        },
      }}
    >
      <div className={`waterFall ${style.waterFall}`}>
        {articles.map((article) => (
          <div
            key={article.id}
            className={`waterFallItem ${style.waterFallItem}`}
          >
            <PostArticle
              article={article}
              renderFn={() => masonry && masonry.layout()}
            ></PostArticle>
          </div>
        ))}
      </div>
      {nowPage.current === totalPage.current && (
        <div>
          <div className={style.friendEnd}>已看完所有好友動態</div>
        </div>
      )}
      {isEnd && <RecommendArticle></RecommendArticle>}
      <div ref={loadingNextPageDOM}></div>
    </Box>
  );
}
export default observer(Portal);
