import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import style from "./job.module.css";
import { useContext } from "react";
import InfoContext from "./infoContext";
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
export default function Job() {
  const { person, setPerson } = useContext(InfoContext);

  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        borderRadius: 3,
      }}
      className={style.wrap}
    >
      <Paper elevation="2" sx={{ p: 2, bgcolor: "#ffffff78" }}>
        <h3>職業</h3>
        <FormControl sx={{ mb: 4, width: "100%" }}>
          <FormLabel id="job">
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
        <FormControl sx={{ mb: 4, width: "100%" }}>
          <h3>工作時間</h3>
          <FormLabel id="job_time"></FormLabel>
          <RadioGroup
            row
            name="job_time"
            aria-labelledby="job_time"
            value={person.wTime}
            onChange={(e, v) => {
              setPerson((person) => ({ ...person, wTime: v }));
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="Morning" />
            <FormControlLabel value="2" control={<Radio />} label="Afternoon" />
            <FormControlLabel value="3" control={<Radio />} label="Evening" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <h3>薪資</h3>
          <FormLabel id="job_time">
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
      </Paper>
    </Box>
  );
}
