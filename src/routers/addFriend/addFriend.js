import React, { useState } from "react";
import style from "./addFriend.module.css";
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../common/api";

export default function AddFriend({ open, setOpen }) {
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    api.searchFriend(keyword);
  };
  return (
    <>
      <Box sx={{ bgcolor: "primary.main", width: "100vw" }}>
        <Paper
          component="form"
          sx={{
            m: 2,
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <InputBase
            placeholder="搜尋好友"
            inputProps={{ "aria-label": "搜尋好友" }}
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.trim())}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={searchHandler}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{ flex: "1 1 0", m: 1 }}>
        <Typography variant="h6" gutterBottom>
          搜尋結果
        </Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://placehold.co/600x400" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="https://placehold.co/600x400" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </>
  );
}
