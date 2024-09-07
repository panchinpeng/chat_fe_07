import { useState, useRef, useEffect } from "react";
import api from "../../common/api";
import PostArticle from "../postArticle/postArticle";
import style from "./recommendArticle.module.css";
export default function RecommendArticle() {
  const [articles, setArticles] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const nowPage = useRef(1);
  const totalPage = useRef(null);
  const loadingNextPageDOM = useRef();
  const maxArticleId = useRef(0);
  useEffect(() => {
    if (articles.length) {
      maxArticleId.current = articles[articles.length - 1].id;
    }
  }, [articles]);
  useEffect(() => {
    let observer = null;
    (async () => {
      const res = await api.getRecommendArticle();
      if (!res.status) {
        alert("發生錯誤");
        // navigate("/");
      }
      totalPage.current = res.data.totalPage;
      setArticles(res.data.results);
      observer = new IntersectionObserver(
        async (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            if (totalPage.current <= nowPage.current) {
              observer.disconnect();
              setIsEnd(true);
              return;
            }
            nowPage.current = nowPage.current + 1;
            const recommendRes = await api.getRecommendArticle(
              maxArticleId.current
            );
            if (recommendRes.status) {
              setArticles((articles) => [
                ...articles,
                ...recommendRes.data.results,
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
  }, []);
  return (
    <>
      <div className={style.title}>熱門動態</div>
      {articles.map((article) => (
        <PostArticle key={article.id} article={article}></PostArticle>
      ))}
      {isEnd && <div className={style.end}>到底了QQ</div>}
      <div ref={loadingNextPageDOM}></div>
    </>
  );
}
