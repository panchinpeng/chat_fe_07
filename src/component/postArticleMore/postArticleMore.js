import React, { useState, useRef } from "react";
import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Alert from "../alert/alert";
const PostArticleShare = React.lazy(
  () => import("../postArticleShare/postArticleShare")
);

export default function PostArticleMore({ showMore, setShowMore, articleId }) {
  const [action, setAction] = useState();
  const warnRef = React.useRef();

  return (
    <Box>
      <Dialog
        onClose={() => setShowMore(false)}
        open={showMore}
        fullWidth={true}
        maxWidth="md"
      >
        <List sx={{ width: "100%" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setAction("share")}>
              <ListItemAvatar>
                <Avatar>
                  <ShareOutlinedIcon color="action"></ShareOutlinedIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="分享" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>

      {action === "share" && (
        <PostArticleShare
          articleId={articleId}
          showWarn={(data) => {
            if (data) {
              warnRef.current.setMessage(data.message);
              warnRef.current.setSeverity(data.type);
            }
          }}
          closeParentDialog={() => {
            setAction(undefined);
            setShowMore(false);
          }}
        ></PostArticleShare>
      )}
      <Alert ref={warnRef} severity="success"></Alert>
    </Box>
  );
}
