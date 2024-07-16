import { useState } from "react";
import style from "./login.module.css";
import { TextField, Box, Link, Button  } from "@mui/material"
import  fetch  from "./../../common/fetch";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submit = async() => {
        if(username && password) {
            const data = await fetch("/api/user/login", {
                body: { username, password },
                method: "POST"
            })
            if(data.status) {
                localStorage.setItem("username", username);
                navigate("/online");
            }

        }
    }

    return <Box className={style.bg}>
        <TextField fullWidth  value={username} onChange={event => setUsername(event.target.value)} margin="dense"id="username" label="username" variant="outlined" />
        <TextField fullWidth  value={password} onChange={event => setPassword(event.target.value)}margin="dense" id="password" label="password" variant="outlined" />

        <Link href="#" underline="none" className={style.btnSignUp}>sign up</Link>
        <Button variant="contained" onClick={submit}>login</Button>
    </Box>
}