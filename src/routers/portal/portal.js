import {
  Box,
  Button,
  Grid,
  Paper,
  Link,
  Avatar,
  Typography,
} from "@mui/material";

import banner1 from "./../../public/chat1.png";
import banner2 from "./../../public/chat2.png";
import banner3 from "./../../public/chat3.png";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper/core";

import style from "./portal.module.css";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Popular from "../../component/popular/popular";
import CoinRank from "../../component/coinRank/coinRank";

import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

SwiperCore.use([Autoplay]);
function Portal() {
  const navigate = useNavigate();
  const store = useStore();
  return (
    <>
      <Swiper
        avigation={true}
        modules={[Navigation]}
        className={`mySwiper ${style.mySwiper}`}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className={style.banner}>
          <img src={banner3} width="100%"></img>
          <div className={style.bannerText}>
            <h4 className={style.title}>愛情與虛擬的完美結合！</h4>
            <Box>
              在這裡，不只是聊天。使用金幣遊戲與區塊鏈支付功能，體驗前所未有的心動感受！加入我們，開始你的愛情冒險吧！
            </Box>
          </div>
        </SwiperSlide>
        <SwiperSlide className={style.banner}>
          <img src={banner1} width="100%"></img>
          <div className={style.bannerText}>
            <h4 className={style.title}>開啟你的數位戀愛之旅！</h4>
            <Box>
              尋找有趣的靈魂伴侶？在這裡，聊天只是開始。金幣遊戲和區塊鏈支付讓你的戀愛旅程更有趣、更安全！
              {!store.user.login && (
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{ p: 0.5, m: 1, fontSize: "12px" }}
                    onClick={() => navigate("/login")}
                  >
                    login
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ p: 0.5, m: 1, fontSize: "12px" }}
                    onClick={() => navigate("/signup")}
                  >
                    sign up
                  </Button>
                </Box>
              )}
            </Box>
          </div>
        </SwiperSlide>
        <SwiperSlide className={style.banner}>
          <img src={banner2} width="100%"></img>
          <div className={style.bannerText}>
            <h4 className={style.title}>
              在遊戲中戀愛，用區塊鏈支付保護你的心！
            </h4>
            <Box>
              不只是聊聊而已，來場與眾不同的愛情冒險吧！我們的交友軟體讓你在遊戲中認識真愛，用區塊鏈支付保護你的每一份心意。
            </Box>
          </div>
        </SwiperSlide>
      </Swiper>

      <Box
        sx={{ maxWidth: "800px", width: "100%", marginY: 5, marginX: "auto" }}
        className={style.coinBg}
      >
        <Grid container sx={{ mt: 2, justifyContent: "center" }}>
          <Grid item xs={11} md={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "primary.main" }}
              className={style.title}
            >
              互动游戏
            </Typography>
          </Grid>
          <Grid item xs={11} md={12}>
            在我们的交友网站，不仅可以遇见有趣的人，还能通过独特的金币系统，享受更多精彩互动。金币是你在这里的通行证，让你体验更多高级功能，增加更多与心仪对象互动的机会。
          </Grid>
          <Grid item xs={11} md={12}>
            金币获取方式
          </Grid>
          <Grid item xs={11} md={12}>
            <ul>
              <li>
                每日签到：每天登录网站，连续签到即可获得金币奖励，累计越多，奖励越丰厚。
              </li>
              <li>
                任务完成：参与网站提供的各类任务，如完善个人资料、上传照片、发送消息等，都能获得金币。
              </li>
              <li>活动参与：参加网站的特别活动或竞赛，赢取大量金币。</li>
              <li>购买金币：你还可以通过充值，快速获得金币，畅享高级功能。</li>
            </ul>
          </Grid>

          <Grid item xs={11} md={12}>
            金币使用途径
          </Grid>
          <Grid item xs={11} md={12}>
            <ul>
              <li>
                发送礼物：用金币购买虚拟礼物，赠送给你心仪的对象，表达你的心意。
              </li>
              <li>
                解锁特权：使用金币解锁高级特权，如查看对方的完整资料、发送无限制消息、优先推荐等。
              </li>
              <li>参与抽奖：用金币参与幸运抽奖，赢取丰厚奖品和更多金币。</li>
              <li>
                互动游戏：用金币参与互动游戏，与喜欢的人一起玩，增进彼此感情。
              </li>
            </ul>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ maxWidth: "800px", width: "100%", marginY: 5, marginX: "auto" }}
      >
        <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={11} md={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "primary.main" }}
              className={style.title}
            >
              用戶分享
            </Typography>
          </Grid>
          <Grid item xs={11} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              我是一个爱幻想的人，其实每个女人都对自己的未来充满了美好的幻想．结婚以前我常想象两人世界的美好，但是结婚后才发现谬之千里。有时我和老公说话，他要么眼睛盯着电视一脸漠然，要么泼冷水：女人吗，头发长见识短。
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Avatar>H</Avatar>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={11} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              朋友说人生是一张单程车票，我们无法提前来到世上走一遍，因此也无法确定芸芸众生中，谁做自己的伴侣较好。天长日久你会发现，你不停地选择，恐怕你会像拾麦穗一样两手空空。现实与想象总是有冲突的，罗曼蒂克的爱情
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Avatar>A</Avatar>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={11} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              我跟我的爱人在这里相识，她的老家跟我是一地的，之后我们两个月后见面，6个月后定亲，今年6月2日晚婚。非常顺利，感谢这个平台让我们两个都找到了彼此的知心伴侣！希望之后越办越好，为更多的人寻找到自己的幸福！
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Avatar>A</Avatar>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={11} md={12} sx={{ textAlign: "right" }}>
            <Link href="#">更多</Link>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ maxWidth: "800px", width: "100%", marginY: 5, marginX: "auto" }}
      >
        <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={11} md={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "primary.main" }}
              className={style.title}
            >
              熱門動態
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={11} md={12}>
          <Popular></Popular>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginY: 5,
          position: "relative",
          overflow: "hidden",
          flex: "0 0 700px",
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{
            maxWidth: "800px",
            width: "100%",
            overflow: "auto",
            marginX: "auto",
            padding: "0",
          }}
          className={style.scroll}
        >
          <Grid
            item
            xs={11}
            md={12}
            sx={{
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              background: "#fff",
              position: "absolute",
              width: "800px",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "primary.main",
              }}
              className={style.title}
            >
              金幣排行
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <CoinRank></CoinRank>
          </Grid>
        </Grid>
        <div className={style.stageBg}></div>
      </Box>
    </>
  );
}
export default observer(Portal);
