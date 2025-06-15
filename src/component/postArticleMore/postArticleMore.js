import React, { useState } from "react";
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
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
const PostArticleShare = React.lazy(
  () => import("../postArticleShare/postArticleShare")
);

function PostArticleMore({ showMore, setShowMore, articleId }) {
  const store = useStore();
  const [action, setAction] = useState();

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
              store.tip.show(data.message, data.type);
            }
          }}
          closeParentDialog={() => {
            setAction(undefined);
            setShowMore(false);
          }}
        ></PostArticleShare>
      )}
    </Box>
  );
}
export default observer(PostArticleMore);
