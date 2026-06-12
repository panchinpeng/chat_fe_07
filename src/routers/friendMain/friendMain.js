import { Box, Grid, Button } from "@mui/material";
import style from "./friendMain.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import api from "../../common/api";
import man from "./../../public/emptyAvatar.png";
import PostArticle from "../../component/postArticle/postArticle";
import useIntersectionObserver from "./../../hooks/useIntersectionObserver.js";
import { UserInterests } from "../../component/userInterests/userInterests";
function FriendMain() {
  const navigate = useNavigate();
  const { user } = useParams();
  const nowPage = useRef(1);
  const totalPage = useRef();
  const loadingNextPageDOM = useRef();
  const maxArticleId = useRef(0);
  const [articles, setArticles] = useState([]);
  const [rankInfo, setRankInfo] = useState({
    activityScore: "-",
    totalArticles: "-",
    totalTrends: "-",
    friendStatus: false,
  });
  const [userInfo, setUserInfo] = useState();
  const { startObserve, isIntersecting } = useIntersectionObserver();

  const addFriend = async () => {
    const res = await api.addFriend(user);
    if (res.status) {
      setRankInfo({ ...rankInfo, friendStatus: "pending" });
    }
  };

  useEffect(() => {
    if (articles.length) {
      maxArticleId.current = articles[articles.length - 1].id;
    }
  }, [articles]);
  useEffect(() => {
    (async () => {
      const rankInfo = await api.getUserRankInfo(user);
      if (rankInfo.status) {
        setRankInfo(rankInfo.data);
      }
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

      const res = await api.getUserInfo(user);
      if (res.status && res.data) {
        setUserInfo(res.data);
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
        <div className={style.profileCard}>
          <img
            width="100%"
            alt="avatar"
            src={`/api/user/avatar?username=${user}`}
            onError={(e) => (e.target.src = man)}
            className={style.pic}
          ></img>
          <div className={style.profileContent}>
            <div className={style.name}>{user}</div>
            {userInfo && userInfo.self_introd && (
              <div className={style.intro}>{userInfo.self_introd}</div>
            )}

            {userInfo && userInfo.interests && (
              <div className={style.interestsWrap}>
                <UserInterests interests={userInfo.interests}></UserInterests>
              </div>
            )}

            {rankInfo.friendStatus && (
              <Button
                variant="contained"
                sx={{
                  alignSelf: "flex-start",
                  borderRadius: "999px",
                  fontWeight: 700,
                  px: 3,
                }}
                color="info"
                onClick={addFriend}
                disabled={rankInfo.friendStatus === "pending"}
              >
                {rankInfo.friendStatus === "apply" ? "加為好友" : "等待回覆"}
              </Button>
            )}
          </div>
        </div>

        <div className={style.statistics}>
          <div>
            <div>貼文數</div>
            <div>{rankInfo.totalArticles}</div>
          </div>
          <div>
            <div>動態數</div>
            <div>{rankInfo.totalTrends}</div>
          </div>
          <div>
            <div>金幣</div>
            <div>-</div>
          </div>
          <div>
            <div>活耀度</div>
            <div>{rankInfo.activityScore}</div>
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
            <div className={style.empty}></div>
          )}
        </Grid>
        <div ref={loadingNextPageDOM}></div>
      </Box>
    </Box>
  );
}
export default FriendMain;
