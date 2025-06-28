import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import style from "./signup.module.css";
import * as THREE from "three";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../../common/api";

import WAVES from "vanta/dist/vanta.waves.min";

import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
function Signup() {
  const store = useStore();
  const myRef = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [betaCheck, setBetaCheck] = useState(false);
  const [clearCacheCode, setClearCacheCode] = useState("");

  useEffect(() => {
    const vantaEffect = WAVES({
      el: myRef.current,
      mouseControls: false,
      touchControls: false,
      THREE: THREE,
      gyroControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      color: "#1685c8",
    });
    setClearCacheCode(Date.now());

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const submit = async () => {
    if (!username) {
      store.tip.show("請輸入帳號", "error");
      return;
    }
    if (!password) {
      store.tip.show("請輸入密碼", "error");
      return;
    }
    if (!birthday) {
      store.tip.show("請輸入生日", "error");
      return;
    }
    if (!captcha) {
      store.tip.show("請輸入驗證碼", "error");
      return;
    }
    if (!betaCheck) {
      store.tip.show("請確認注意事項", "error");
      return;
    }
    if (!/^\w+$/.test(username) || username.length >= 50) {
      store.tip.show("帳號僅允許英文字母、數字底線，並限定在50字以下", "error");
      return;
    }
    if (password.length >= 50) {
      store.tip.show("密碼限定在50字以下", "error");
      return;
    }

    const res = await api.regester(username, password, birthday, captcha);
    if (res.status) {
      store.tip.show("恭喜你註冊成功，將為你導向登入頁", "success");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } else {
      store.tip.show("註冊失敗，請確認資料是否正確輸入", "error");
    }
  };
  return (
    <>
      <div className={style.bgImgage} ref={myRef}></div>
      <Box className={style.bg}>
        <div className={style.logo}></div>
        <h4>歡迎你加入</h4>
        <div>填寫下方資訊，建立帳號</div>

        <TextField
          fullWidth
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="dense"
          id="username"
          label="帳號"
          variant="outlined"
          required={true}
        />
        <TextField
          fullWidth
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="dense"
          id="password"
          label="密碼"
          variant="outlined"
          type="password"
          required={true}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="生日"
            sx={{ mt: 1, width: 1 }}
            onChange={(event) => setBirthday(event.format("YYYY-MM-DD"))}
          />
        </LocalizationProvider>
        <img
          src={`${process.env.REACT_APP_API_DOMAIN}/captcha?cache=${clearCacheCode}`}
          className={style.captcha}
          alt="captcha"
        ></img>
        <TextField
          label="驗證碼"
          variant="outlined"
          fullWidth
          value={captcha}
          required={true}
          onChange={(event) => setCaptcha(event.target.value)}
          inputProps={{ maxLength: 4 }}
        />
        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(event) => setBetaCheck(event.target.checked)}
            />
          }
          label="該網站為測試版本"
          sx={{ mr: "auto" }}
        />
        <NavLink to="/login" className={style.extraAction}>
          已經有帳號?
        </NavLink>
        <Button variant="contained" onClick={submit} sx={{ mt: 4 }}>
          註冊
        </Button>
      </Box>
    </>
  );
}
export default observer(Signup);
