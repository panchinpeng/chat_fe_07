import {
  Box,
  TextField,
  Button,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import style from "./signup.module.css";
import { useState } from "react";
import Footer from "../../component/footer/footer";
import { NavLink } from "react-router-dom";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [warn, setWarn] = useState("");
  const [betaCheck, setBetaCheck] = useState(false);
  const submit = () => {
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
  };
  return (
    <>
      <div className={style.bgImgage}></div>
      <Box className={style.bg}>
        <div className={style.logo}></div>
        <h4>Welcome to our chat! </h4>
        <div>
          Please fill in the following information to create your account:
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
      </Box>
      <Footer></Footer>
    </>
  );
}
