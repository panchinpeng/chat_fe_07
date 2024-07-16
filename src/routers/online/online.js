import { Box, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client";
export default function Online() {
    const socket = useRef(null);
    const [users, setUsers] = useState([]);
    console.log(users);
    useEffect(() => {
        if(!socket.current) {
            socket.current = io("ws://localhost:3002", {
                auth: {username: localStorage.getItem("username")}
            });
            socket.current.onAny((event, ...args) => {
                console.log(event, args);
              });
              
    
            socket.current.on("connect_error", (err) => {
                if (err.message === "invalid username") {
                    console.log("usernameAlreadySelected")
                }
            })
    
            socket.current.on("user connected", (newUser) => {
                setUsers(user => [...user, newUser])
            });
    
            socket.current.on("users", (users) => {
                setUsers(users);
            })
    
            socket.current.on("private_message", ({ content, from }) => {
                console.log("receive message", content)
            })
    
            setTimeout(() => {
                alert("CCC");
                socket.current.emit("test")
            }, 5000)
        }
      
    }, [])
    return <Box>
        <div>
            <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            variant="standard"
            />
        </div>
        {/* <button onClick={() => {
            socket.current.emit("private_message", {
                content,
                to: this.selectedUser.userID,
            })
        }}>tedt</button> */}


        { users.map(item => <div key={item.username} onClick={() => {
            alert("aaa");
            socket.current.emit("private_message", {
                content: "test",
                to: item.userID,
            });
        }}>{item.username}</div>) }

    
    </Box>
}