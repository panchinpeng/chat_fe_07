import { IconButton } from "@mui/material";
import { useStore } from "./../../store";
import { observer } from "mobx-react-lite";
import style from "./message.module.css";
import Avatar from "./../avatar/avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Emoji from "../emoji/emoji";
import { Emoji as EmojiSingle } from "emoji-picker-react";
import { useRef, useState } from "react";
function Message({ message, setReply, sendReaction }) {
  const touchRef = useRef(false);
  const [showMore, setShowMore] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const store = useStore();
  const my = store.user.account.username === message.from_username;
  const time = new Date(Date.parse(message.send_time));
  const timeString = `${(time.getMonth() + 1).toString().padStart(2, "0")}-${time.getDate().toString().padStart(2, "0")} ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;

  const handleTouchStart = () => {
    touchRef.current = setTimeout(() => {
      setShowMore(true);
    }, 500);
  };
  const handleTouchEnd = () => {
    clearTimeout(touchRef.current);
  };

  const renderReaction = (reaction) => {
    console.log("aaa", Object.values(reaction));
    return Object.values(reaction).map((item) => (
      <EmojiSingle unified={item} size="18"></EmojiSingle>
    ));
  };

  return (
    <div className={`${style.message} ${my ? style.right : style.left}`}>
      <Avatar
        from="Message"
        friendName={my ? undefined : message.from_username}
      ></Avatar>
      <div
        className={style.messageWrap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={style.messageContent} id={`message${message.id}`}>
          {message.reply_id && (
            <a
              className={style.replyMessage}
              href={`#message${message.reply_id}`}
            >
              {message.reply_message}
            </a>
          )}
          {message.message}
          {message.reaction && (
            <>
              <div className={style.fake}></div>
              <div className={style.reactionWrap}>
                {renderReaction(message.reaction)}
              </div>
            </>
          )}

          <Emoji
            open={showEmoji}
            sendReaction={(unified) => {
              sendReaction(
                unified,
                message.id,
                my ? message.to_username : message.from_username
              );
              setShowEmoji(false);
            }}
          ></Emoji>
        </div>
        <div className={style.time}>
          {showMore ? (
            <div className={style.more}>
              <IconButton
                aria-label="fingerprint"
                color="primary"
                onClick={() => setReply(message.id)}
              >
                <ReplyIcon />
              </IconButton>
              <IconButton
                aria-label="fingerprint"
                color="primary"
                onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
              >
                <EmojiEmotionsIcon />
              </IconButton>
            </div>
          ) : (
            <div />
          )}

          <div className={style.timeData}>{timeString}</div>
        </div>
      </div>
    </div>
  );
}
export default observer(Message);
