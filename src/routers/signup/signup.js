import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import style from "./signup.module.css";
import Footer from "../../component/footer/footer";
import * as THREE from "three";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../../common/api";

import WAVES from "vanta/dist/vanta.waves.min";

export default function Signup() {
  const myRef = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [betaCheck, setBetaCheck] = useState(false);
  const [warn, setWarn] = useState("");
  const [regesterFail, setRegesterFail] = useState(false);
  const [regesterSuccess, setRegesterSuccess] = useState(false);

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
      setWarn("Please enter your username.");
      return;
    }
    if (!password) {
      setWarn("Please enter your password.");
      return;
    }
    if (!birthday) {
      setWarn("Please enter your birthday.");
      return;
    }
    if (!betaCheck) {
      setWarn("Please enter your checkbox.");
      return;
    }

    const res = await api.regester(username, password, birthday);
    if (res.status) {
      setRegesterSuccess(true);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } else {
      setRegesterFail(true);
    }
  };
  return (
    <>
      <div className={style.bgImgage} ref={myRef}></div>
      <Box className={style.bg}>
        <div className={style.logo}></div>
        <h4>Welcome to our chat! </h4>
        <div>
          Please fill in the following information to create your account:
        </div>
        <Alert
          variant="filled"
          severity="error"
          sx={{ my: 1, display: regesterFail ? "" : "none" }}
        >
          Registration Failed We’re sorry, your registration attempt was
          unsuccessful. Please check the information you provided and try again
        </Alert>
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="birthday"
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
          label="Please be aware that this is a beta version"
          sx={{ mr: "auto" }}
        />
        <NavLink to="/login" className={style.extraAction}>
          Already have an account?
        </NavLink>
        <Button variant="contained" onClick={submit} sx={{ mt: 4 }}>
          signup
        </Button>
        <Snackbar
          open={!!warn}
          autoHideDuration={4000}
          onClose={() => setWarn("")}
          message={warn}
        />
        <Snackbar
          sx={{ bgcolor: "success.main", color: "success.main" }}
          anchorOrigin={{ vertical: "buttom", horizontal: "center" }}
          open={regesterSuccess}
        >
          <Alert severity="success" variant="filled">
            Congratulations! Your account has been successfully registered.
            Please log in again to start using your account.
          </Alert>
        </Snackbar>
      </Box>
      <Footer></Footer>
    </>
  );
}
