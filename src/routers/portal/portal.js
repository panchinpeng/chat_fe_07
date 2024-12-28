import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import style from "./portal.module.css";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import PostArticle from "../../component/postArticle/postArticle";
import RecommendArticle from "../../component/recommendArticle/recommendArticle";
import Masonry from "masonry-layout";

function Portal() {
  const store = useStore();
  const [articles, setArticles] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const loadingNextPageDOM = useRef();
  const nowPage = useRef(1);
  const totalPage = useRef(null);
  const maxArticleId = useRef(0);
  const [masonry, setMasonry] = useState(null);

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
    let observer = null;
    (async () => {
      store.trends.getAllFriendTrends();
      const articlesRes = await api.getArticle();

      if (articlesRes.data.results.length) {
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
      } else {
        setIsEnd(true);
      }
    })();
    return () => {
      masonry && masonry.destroy();
      observer && observer.disconnect();
      observer = null;
    };
  }, []);

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
      <div className="waterFall">
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
