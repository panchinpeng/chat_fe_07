import { useState, useRef, useEffect } from "react";
import api from "../../common/api";
import PostArticle from "../postArticle/postArticle";
import style from "./recommendArticle.module.css";
import Masonry from "masonry-layout";
import useIntersectionObserver from "./../../hooks/useIntersectionObserver.js";
export default function RecommendArticle() {
  const [articles, setArticles] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const nowPage = useRef(1);
  const totalPage = useRef(null);
  const loadingNextPageDOM = useRef();
  const maxArticleId = useRef(0);
  const [masonry, setMasonry] = useState(null);
  const waterFallDOM = useRef();
  const { startObserve, isIntersecting } = useIntersectionObserver();
  useEffect(() => {
    if (articles.length) {
      maxArticleId.current = articles[articles.length - 1].id;
      setMasonry(
        new Masonry(waterFallDOM.current, {
          columnWidth: 300,
          itemSelector: ".waterFallItem2",
          gutter: 10,
        })
      );
    }
  }, [articles]);
  useEffect(() => {
    (async () => {
      const res = await api.getRecommendArticle();
      if (res.data.results.length > 0) {
        totalPage.current = res.data.totalPage;
        setArticles(res.data.results);
        startObserve(loadingNextPageDOM.current);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isIntersecting) {
        if (totalPage.current <= nowPage.current) {
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
    })();
  }, [isIntersecting]);

  useEffect(() => {
    setTimeout(() => {
      if (masonry) {
        masonry.layout();
      }
    }, 200);
  }, [masonry]);
  return (
    <>
      <div className={style.title}>熱門動態</div>
      <div className="waterFall" ref={waterFallDOM}>
        {articles.map((article) => (
          <div
            key={article.id}
            className={`waterFallItem2 ${style.waterFallItem}`}
          >
            <PostArticle
              article={article}
              renderFn={() => masonry && masonry.layout()}
            ></PostArticle>
          </div>
        ))}
      </div>

      {isEnd && <div className={style.end}>到底了QQ</div>}
      <div ref={loadingNextPageDOM}></div>
    </>
  );
}
