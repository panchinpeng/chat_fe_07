import { useState } from "react";
import style from "./login.module.css";
import {
  TextField,
  Box,
  Link,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import api from "../../common/api";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../component/footer/footer";

// store
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [betaCheck, setBetaCheck] = useState(false);
  const navigate = useNavigate();
  const store = useStore();
  const submit = async () => {
    if (username && password) {
      const data = await api.login(username, password);
      if (data.status) {
        store.user.setLogin(true);
        navigate("/member");
      }
    }
  };

  return (
    <>
      <div className={style.bgImgage}></div>
      <Box className={style.bg}>
        <div className={style.logo}></div>
        <h4>Welcome Back!</h4>
        <div>
          We're glad to see you again. Please log in to access your account and
          continue enjoying our services.
        </div>
        <TextField
          fullWidth
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="dense"
          id="username"
          label="username"
          variant="outlined"
          required={true}
        />
        <TextField
          fullWidth
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="dense"
          id="password"
          label="password"
          variant="outlined"
          type="password"
          required={true}
        />
        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(event) => setBetaCheck(event.target.checked)}
            />
          }
          label="Please be aware that this is a beta version"
          sx={{ mr: "auto" }}
        />
        <NavLink to="/signup" className={style.extraAction}>
          New to Our Website?
        </NavLink>
        <Button variant="contained" onClick={submit} sx={{ mt: 4 }}>
          Log in
        </Button>
      </Box>
      <Footer></Footer>
    </>
  );
}

export default observer(Login);
