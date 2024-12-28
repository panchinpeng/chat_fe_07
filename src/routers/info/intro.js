import {
  Box,
  FormControl,
  FormLabel,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CuAvatar from "./../../component/avatar/avatar";
import Alert from "../../component/alert/alert";
import style from "./intro.module.css";
import InfoContext from "./infoContext";
import { useContext, useRef } from "react";
export default function Intro() {
  const { person, setPerson } = useContext(InfoContext);
  const warnRef = useRef();
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        borderRadius: 3,
      }}
      className={style.wrap}
    >
      <Paper elevation={2} sx={{ p: 2, bgcolor: "#ffffff78" }}>
        <h3>個人介紹</h3>
        <Box sx={{ textAlign: "center" }}>
          <CuAvatar from="my"></CuAvatar>

          <Box sx={{ mt: 4, textAlign: "left" }}>
            <FormControl sx={{ width: "100%" }}>
              <h3>關於自己</h3>

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
          <Box sx={{ mt: 4, textAlign: "left" }}>
            <FormControl sx={{ width: "100%" }}>
              <h3>是否開放被搜尋</h3>
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
                <FormControlLabel
                  value="open"
                  control={<Radio />}
                  label="開啟"
                />
                <FormControlLabel
                  value="close"
                  control={<Radio />}
                  label="關閉"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Alert ref={warnRef} severity="error"></Alert>
      </Paper>
    </Box>
  );
}
