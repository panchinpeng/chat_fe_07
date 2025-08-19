import { useState, useEffect } from "react";
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
import loginImg from "./../../public/login.png";

// store
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [betaCheck, setBetaCheck] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [clearCacheCode, setClearCacheCode] = useState("");

  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    setClearCacheCode(Date.now());
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
    const data = await api.login(username, password, captcha);
    if (data.status) {
      store.user.setLogin(true);

      navigate("/");
    } else {
      store.tip.show("登入失敗，請確認帳密是否輸入正確", "error");
    }
  };

  return (
    <>
      <Box className={style.bg}>
        <div className={style.field}>
          <img src={loginImg} className={style.pageIcon}></img>
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
          <NavLink to="/forgetPassword" className={style.extraAction}>
            忘記密碼
          </NavLink>
          <img
            src={`/captcha?cache=${clearCacheCode}`}
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
          <div>
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
          </div>

          <NavLink to="/signup" className={style.extraAction}>
            還沒有帳號?
          </NavLink>
          <div className={style.actions}>
            <Button variant="contained" onClick={submit} sx={{ mt: 4 }}>
              登入
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
}

export default observer(Login);
