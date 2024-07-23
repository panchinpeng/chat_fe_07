import { Box, FormControl, FormLabel, Chip, Paper } from "@mui/material";
import { useContext, useRef } from "react";
import style from "./interest.module.css";
import Alert from "../../component/alert/alert";
import InfoContext from "./infoContext";
const interests = [
  "跑步",
  "游泳",
  "瑜伽",
  "舉重",
  "足球",
  "籃球",
  "高爾夫",
  "網球",
  "自行車",
  "滑板",
  "滑雪",
  "冰球",
  "攀岩",
  "徒步旅行",
  "衝浪",
  "羽毛球",
  "武術",
  "舞蹈",
  "音樂創作",
  "鋼琴",
  "吉他",
  "小號",
  "鼓",
  "合唱",
  "繪畫",
  "雕刻",
  "攝影",
  "陶藝",
  "紡織",
  "編織",
  "手工藝",
  "園藝",
  "料理",
  "烘焙",
  "餐廳探索",
  "酒品品鑑",
  "啤酒釀造",
  "烤肉",
  "冥想",
  "閱讀",
  "寫作",
  "繪本創作",
  "博客寫作",
  "藝術欣賞",
  "看電影",
  "影評",
  "玩桌遊",
  "電子遊戲",
  "編程",
  "科技探索",
  "3D 打印",
  "電子音樂",
  "樂器製作",
  "珠寶設計",
  "圖片編輯",
  "電視劇",
  "收藏",
  "動物照顧",
  "志願服務",
  "社區活動",
  "環保活動",
  "科學實驗",
  "天文學",
  "旅行",
  "世界文化",
  "烹飪課程",
  "戶外露營",
  "野外求生",
  "美術館參觀",
  "音樂會",
  "節日慶典",
  "體育賽事",
  "市場購物",
  "手機攝影",
  "旅行寫作",
  "自我提升",
  "健康飲食",
  "瑜伽冥想",
  "網路小說",
  "文學研究",
  "環球旅行",
  "世界音樂",
  "隨筆寫作",
  "家居裝飾",
  "藝術拍賣",
  "現代舞",
  "街頭表演",
  "網路創業",
  "社交媒體",
  "環境保護",
  "攝影展",
  "舞台劇",
  "撲克牌",
  "無人機攝影",
  "游艇旅行",
  "星座研究",
  "體育解說",
  "魔術表演",
  "寵物訓練",
  "釣魚",
];
export default function Interest() {
  const warnRef = useRef();
  const { person, setPerson } = useContext(InfoContext);
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        borderRadius: 3,
      }}
    >
      <Paper elevation="2" sx={{ p: 2 }}>
        <h3>Interest</h3>
        <FormControl>
          <FormLabel>
            Please share your interests and hobbies with us so we can better
            understand you and recommend suitable activities and resources.
          </FormLabel>
          <div className={style.interestWrap}>
            {interests
              .filter((item) => !person.interests.includes(item))
              .map((item) => (
                <Chip
                  color="primary"
                  sx={{ ml: 1, mt: 1 }}
                  label={item}
                  onClick={() => {
                    if (person.interests.length >= 10) {
                      warnRef.current.setMessage("Select up to 10");
                      return;
                    }
                    setPerson((person) => ({
                      ...person,
                      interests: [...person.interests, item],
                    }));
                  }}
                  key={item}
                  variant="outlined"
                />
              ))}
          </div>
        </FormControl>

        <h5>Selected ({person.interests.length})</h5>
        <div className={style.interestWrap}>
          {person.interests.map((item, index) => (
            <Chip
              color="primary"
              sx={{ ml: 1, mt: 1 }}
              label={item}
              onDelete={() => {
                setPerson((person) => {
                  const cp = [...person.interests];
                  cp.splice(index, 1);
                  return {
                    ...person,
                    interests: cp,
                  };
                });
              }}
              key={item}
            />
          ))}
        </div>
        <Alert severity="error" ref={warnRef}></Alert>
      </Paper>
    </Box>
  );
}
