import {
  Box,
  FormControl,
  FormLabel,
  Paper,
  RadioGroup,
  Radio,
  Chip,
  FormControlLabel,
} from "@mui/material";
import CuAvatar from "./../../component/avatar/avatar";
import Alert from "../../component/alert/alert";
import style from "./intro.module.css";
import InfoContext from "./infoContext";
import { useContext, useRef } from "react";
const jobMap = [
  "醫生",
  "律師",
  "軟件工程師",
  "教師",
  "建築師",
  "警察",
  "廚師",
  "護士",
  "藝術家",
  "作家",
  "銀行家",
  "設計師",
  "銷售經理",
  "行政助理",
  "科學家",
  "電子工程師",
  "資訊安全專家",
  "藥劑師",
  "心理學家",
  "營養師",
  "記者",
  "市場營銷專家",
  "翻譯員",
  "導遊",
  "飛行員",
  "體育教練",
  "木匠",
  "電焊工",
  "管理顧問",
  "獸醫",
  "電影導演",
  "音樂家",
  "會計師",
  "時裝設計師",
  "鐵路工程師",
  "醫療研究員",
  "社工",
  "消防員",
  "營建經理",
  "律師助理",
  "行銷專員",
  "投資銀行家",
  "化學工程師",
  "項目經理",
  "機械工程師",
  "動畫師",
  "水管工",
  "幼兒教師",
  "運輸經理",
  "髮型師",
];
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
export default function Intro() {
  const { person, setPerson } = useContext(InfoContext);
  const warnRef = useRef();
  return (
    <Box>
      <h3>個人介紹</h3>
      <Box sx={{ textAlign: "center" }} className={style.field}>
        <CuAvatar from="my"></CuAvatar>

        <Box sx={{ mt: 4, textAlign: "left" }}>
          <FormControl sx={{ width: "100%" }}>
            <h3 className={style.title}>關於自己</h3>
            <textarea
              rows={3}
              className={style.textarea}
              placeholder="更有趣的簡介，可以增加配對哦😄"
              value={person.intro}
              onChange={(e) => {
                if (e.target.value.length > 100) {
                  warnRef.current.setMessage("最多100個字");
                  return;
                }
                setPerson((person) => ({ ...person, intro: e.target.value }));
              }}
            ></textarea>
          </FormControl>
        </Box>
        <Box sx={{ textAlign: "left" }} className={style.field}>
          <FormControl sx={{ width: "100%" }}>
            <h3 className={style.title}>是否開放被搜尋</h3>
            <FormLabel>
              當開放被搜尋後，其他人將能透過搜尋功能找尋到你
            </FormLabel>
            <RadioGroup
              aria-labelledby="開放搜尋"
              name="開放搜尋"
              value={person.public ? "open" : "close"}
              onChange={(e) => {
                setPerson((person) => ({
                  ...person,
                  public: e.target.value === "open",
                }));
              }}
              sx={{ display: "inline" }}
            >
              <FormControlLabel value="open" control={<Radio />} label="開啟" />
              <FormControlLabel
                value="close"
                control={<Radio />}
                label="關閉"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ textAlign: "left" }} className={style.field}>
        <FormControl sx={{ width: "100%" }}>
          <h3 className={style.title}>職業</h3>
          <FormLabel>
            請選擇您的職業，以便我們提供量身定制的內容和推薦。
          </FormLabel>
          <select
            className={style.select}
            value={person.job}
            onChange={(e) =>
              setPerson((person) => ({ ...person, job: e.target.value }))
            }
          >
            <option value=""></option>
            {jobMap.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <h3 className={style.title}>工作時間</h3>
          <FormLabel></FormLabel>
          <RadioGroup
            row
            name="job_time"
            aria-labelledby="job_time"
            value={person.wTime}
            onChange={(e, v) => {
              setPerson((person) => ({ ...person, wTime: v }));
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="早上" />
            <FormControlLabel value="2" control={<Radio />} label="中午" />
            <FormControlLabel value="3" control={<Radio />} label="晚上" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <h3 className={style.title}>薪資</h3>
          <FormLabel>
            提供您的薪資範圍有助於我們為您提供更相關的內容和服務。
          </FormLabel>
          <select
            className={style.select}
            value={person.salary}
            onChange={(e) =>
              setPerson((person) => ({ ...person, salary: e.target.value }))
            }
          >
            <option value=""></option>
            <option value="20000 ~ 30000">20000 ~ 30000</option>
            <option value="30000 ~ 40000">30000 ~ 40000</option>
            <option value="40000 ~ 50000">40000 ~ 50000</option>
            <option value="50000 ~ 60000">50000 ~ 60000</option>
            <option value="60000 ~ 700000">60000 ~ 700000</option>
            <option value="70000 up">70000 up</option>
          </select>
        </FormControl>
      </Box>
      <Box sx={{ textAlign: "left" }} className={style.field}>
        <FormControl sx={{ width: "100%" }}>
          <h3 className={style.title}>興趣</h3>
          <FormLabel>
            請與我們分享您的興趣和愛好，以便我們更好地了解您並推薦合適的活動和資源。
          </FormLabel>
          <div className={style.interestWrap}>
            {interests
              .filter((item) => !person.interests.includes(item))
              .map((item) => (
                <Chip
                  color="primary"
                  sx={{ ml: 0.5, mt: 0.5 }}
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

        <h5>已選澤 ({person.interests.length})</h5>
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
      </Box>

      <Alert ref={warnRef} severity="error"></Alert>
    </Box>
  );
}
