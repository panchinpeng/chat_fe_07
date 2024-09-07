import {
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import Avatar from "../avatar/avatar";
import style from "./commits.module.css";
import { useState } from "react";

export default function Commits() {
  const [commitMsg, setCommitMsg] = useState("");
  return (
    <Box sx={{ mt: 1 }} className={style.commitsWrap}>
      <Box sx={{ p: 1, pb: 0 }}>
        <TextField
          label=""
          multiline
          maxRows={8}
          variant="standard"
          fullWidth
          value={commitMsg}
          onInput={(e) => setCommitMsg(e.target.value)}
          placeholder="發表留言 ..."
        />
        <Box sx={{ "& button": { mt: 0.5 }, textAlign: "right" }}>
          <Button variant="contained" color="success" size="small">
            送出
          </Button>
        </Box>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper", pt: 0 }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{ flex: "0 0 36px", minWidth: 0 }}>
            <Avatar from="Message" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={"I'll be in your neighborhood doing errands this"}
          ></ListItemText>
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{ flex: "0 0 36px", minWidth: 0 }}>
            <Avatar from="Message" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={"I'll be in your neighborhood doing errands this"}
          ></ListItemText>
        </ListItem>
      </List>
    </Box>
  );
}
