import { Box } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import style from "./emoji.module.css";

export default function Emoji({ sendReaction, open }) {
  const selectEmoji = (e) => {
    console.log(e);
    sendReaction(e.unified);
  };
  return (
    <Box sx={{ mt: open ? 1 : 0 }}>
      <EmojiPicker
        open={open}
        reactionsDefaultOpen={true}
        allowExpandReactions={false}
        autoFocusSearch={false}
        className={style.emoji}
        onReactionClick={selectEmoji}
      ></EmojiPicker>
    </Box>
  );
}
