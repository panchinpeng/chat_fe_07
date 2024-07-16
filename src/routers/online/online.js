import { Box, TextField } from "@mui/material"
import { useEffect } from "react"
import { io } from "socket.io-client";
export default function Online() {
    // useEffect(() => {
    //     const socket = io("/service");
    // }, [])
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

    </Box>
}