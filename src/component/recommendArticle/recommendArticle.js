import { useState, useRef, useEffect } from "react";
import api from "../../common/api";
import PostArticle from "../postArticle/postArticle";
import style from "./recommendArticle.module.css";
import Masonry from "masonry-layout";
export default function RecommendArticle() {
  const [articles, setArticles] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const nowPage = useRef(1);
  const totalPage = useRef(null);
  const loadingNextPageDOM = useRef();
  const maxArticleId = useRef(0);
  const [masonry, setMasonry] = useState(null);
  const waterFallDOM = useRef();
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
    let observer = null;
    (async () => {
      const res = await api.getRecommendArticle();
      totalPage.current = res.data.totalPage;
      setArticles(res.data.results);
      if (res.data.results.length > 0) {
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
      }
    })();
    return () => {
      observer && observer.disconnect();
      observer = null;
    };
  }, []);

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
          <div className={`waterFallItem2 ${style.waterFallItem}`}>
            <PostArticle
              key={article.id}
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
