import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

import forgetPasswordImg from "./../../public/forgetPassword.png";

import style from "./forgetPassword.module.css";
import api from "../../common/api";
function ForgetPassword() {
  const store = useStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [clearCacheCode, setClearCacheCode] = useState("");
  const [banInfo, setBanInfo] = useState({ ban: false, times: 0 });

  useEffect(() => {
    setClearCacheCode(Date.now());
  }, []);

  const submit = async () => {
    if (!username) {
      store.tip.show("請輸入帳號", "error");
      return;
    }
    if (!birthday) {
      store.tip.show("請輸入生日", "error");
      return;
    }
    if (!password) {
      store.tip.show("請輸入新密碼", "error");
      return;
    }
    if (password !== newPassword) {
      store.tip.show("兩次密碼輸入不相同", "error");
      return;
    }
    if (!captcha) {
      store.tip.show("請輸入驗證碼", "error");
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

    const res = await api.resetPassowrd(username, password, birthday, captcha);
    if (res.status && res.data) {
      const resInfo = res.data;
      setBanInfo(resInfo);
      if (resInfo.chagneStatus) {
        store.tip.show("修改密碼成功，請重新登入", "success");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      } else if (resInfo.ban) {
        store.tip.show("已超出可修改限制次數，請稍後在試", "error");
      } else {
        store.tip.show("修改失敗，請確認資料是否正確輸入", "error");
      }
    } else {
      store.tip.show("修改失敗，請確認資料是否正確輸入", "error");
    }
  };

  return (
    <Box className={style.box}>
      <div className={style.field}>
        <img src={forgetPasswordImg} className={style.pageIcon}></img>

        <h4>更換密碼</h4>
        <div>我們需要一些資料來確認是你本人，請填寫下列資訊</div>
        <div>為了保護你的帳號安全，最多可嘗次輸入錯誤 3 次喔！</div>

        <br />
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
          sx={{ mt: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="生日"
            sx={{ mt: 2, width: 1 }}
            onChange={(event) => setBirthday(event.format("YYYY-MM-DD"))}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="dense"
          id="password"
          label="新密碼"
          variant="outlined"
          type="password"
          required={true}
          inputProps={{ maxLength: 50 }}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          margin="dense"
          id="password"
          label="再次輸入新密碼"
          variant="outlined"
          type="password"
          required={true}
          inputProps={{ maxLength: 50 }}
          sx={{ mt: 2 }}
        />
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
          sx={{ mt: 2 }}
        />
        <NavLink to="/login" className={style.extraAction}>
          回登入頁
        </NavLink>
        <div className={style.actions}>
          <Button variant="contained" sx={{ mt: 4 }} onClick={submit}>
            送出
          </Button>
        </div>
      </div>
    </Box>
  );
}
export default observer(ForgetPassword);
