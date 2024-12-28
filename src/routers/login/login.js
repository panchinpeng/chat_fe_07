import { useState, useRef, useEffect } from "react";
import style from "./login.module.css";
import {
  TextField,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import api from "../../common/api";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "./../../component/alert/alert";
import * as THREE from "three";

// store
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

import WAVES from "vanta/dist/vanta.waves.min";

function Login() {
  const myRef = useRef(null);
  const alertRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [betaCheck, setBetaCheck] = useState(false);
  const navigate = useNavigate();
  const store = useStore();

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
    const data = await api.login(username, password);
    if (data.status) {
      store.user.setLogin(true);

      navigate("/");
    } else {
      alertRef.current.setMessage("登入失敗，請確認帳密是否輸入正確");
    }
  };

  return (
    <>
      <div className={style.bgImgage} ref={myRef}></div>
      <Box className={style.bg}>
        <div className={style.logo}></div>
        <h4>歡迎回來</h4>
        <div>很高興再次看到你，請登入帳號，繼續享受我們的服務。</div>
        <TextField
          fullWidth
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="dense"
          id="username"
          label="帳號"
          variant="outlined"
          required={true}
          inputProps={{ maxLength: 50 }}
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
          inputProps={{ maxLength: 50 }}
        />
        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(event) => setBetaCheck(event.target.checked)}
            />
          }
          label="目前網站為測試版本"
          sx={{ mr: "auto" }}
        />
        <NavLink to="/signup" className={style.extraAction}>
          還沒有帳號?
        </NavLink>
        <Button variant="contained" onClick={submit} sx={{ mt: 4 }}>
          登入
        </Button>
      </Box>
      <Alert severity="error" ref={alertRef}></Alert>
    </>
  );
}

export default observer(Login);
