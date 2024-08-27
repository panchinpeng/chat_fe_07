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
import Footer from "../../component/footer/footer";
import Alert from "./../../component/alert/alert";
import * as THREE from "three";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../../common/api";

import WAVES from "vanta/dist/vanta.waves.min";

export default function Signup() {
  const myRef = useRef(null);
  const alertRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [betaCheck, setBetaCheck] = useState(false);

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

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const submit = async () => {
    if (!username) {
      alertRef.current.setMessage("請輸入帳號");
      return;
    }
    if (!password) {
      alertRef.current.setMessage("請輸入密碼");
      return;
    }
    if (!birthday) {
      alertRef.current.setMessage("請輸入生日");
      return;
    }
    if (!betaCheck) {
      alertRef.current.setMessage("請確認注意事項");
      return;
    }
    if (!/^\w+$/.test(username) || username.length >= 50) {
      alertRef.current.setMessage(
        "帳號僅允許英文字母、數字底線，並限定在50字以下"
      );
      return;
    }
    if (password.length >= 50) {
      alertRef.current.setMessage("密碼限定在50字以下");
      return;
    }

    const res = await api.regester(username, password, birthday);
    if (res.status) {
      alertRef.current.setMessage("恭喜你註冊成功，將為你導向登入頁");
      alertRef.current.setSeverity("success");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } else {
      alertRef.current.setMessage("註冊失敗，請確認資料是否正確輸入");
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
            sx={{ mt: 2, width: 1 }}
            onChange={(event) => setBirthday(event.format("YYYY-MM-DD"))}
          />
        </LocalizationProvider>
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
      <Footer></Footer>
      <Alert severity="error" ref={alertRef}></Alert>
    </>
  );
}
