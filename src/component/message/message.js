import { IconButton } from "@mui/material";
import { useStore } from "./../../store";
import { observer } from "mobx-react-lite";
import style from "./message.module.css";
import Avatar from "./../avatar/avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import Emoji from "../emoji/emoji";
import { FacebookCounter } from "@charkour/react-reactions";
import { useState, lazy } from "react";
const PostArticle = lazy(() => import("./../postArticle/postArticle"));

function Message({ message, setReply, sendReaction, deleteMessage }) {
  const [showMore, setShowMore] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const store = useStore();
  const my = store.user.account.username === message.from_username;
  const time = new Date(Date.parse(message.send_time));
  const timeString = `${(time.getMonth() + 1).toString().padStart(2, "0")}-${time.getDate().toString().padStart(2, "0")} ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;

  const renderReaction = (reaction) => {
    return Object.entries(reaction).map(([by, emoji]) => (
      <FacebookCounter
        alwaysShowOthers={false}
        counters={[{ emoji, by }]}
        important={[by]}
        key={by}
        className={style.reactionText}
      ></FacebookCounter>
    ));
  };
  const renderMessage = (message) => {
    if (typeof message === "object" && message.type === "article") {
      return <PostArticle article={message} from="chatroom"></PostArticle>;
    } else if (typeof message === "object" && message.type === "image") {
      return (
        <div>
          <img
            width="100%"
            src={`${process.env.REACT_APP_API_DOMAIN}/api/message/getImage?path=${message.path}`}
          ></img>
        </div>
      );
    }

    try {
      new URL(message);
      return (
        <a
          target="_blank"
          rel="noreferrer"
          href={message}
          className={style.link}
        >
          {message}
        </a>
      );
    } catch (e) {
      return message;
    }
  };

  const renderReply = (message) => {
    if (message.reply_id) {
      if (message.reply_message === "is_del=1") {
        return <div className={style.replyMessageDelete}>訊息已回收</div>;
      } else {
        return (
          <a
            className={style.replyMessage}
            href={`#message${message.reply_id}`}
          >
            {message.reply_message}
          </a>
        );
      }
    }
    return "";
  };

  return (
    <div className={`${style.message} ${my ? style.right : style.left}`}>
      <Avatar
        from="Message"
        friendName={my ? undefined : message.from_username}
      ></Avatar>
      <div className={style.messageWrap}>
        <div className={style.messageContent} id={`message${message.id}`}>
          {renderReply(message)}

          {renderMessage(message.message)}
          {message.reaction && (
            <>
              <div className={style.fake}></div>
              <div className={style.reactionWrap}>
                {renderReaction(message.reaction)}
              </div>
            </>
          )}

          <Emoji
            open={showEmoji && showMore}
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
              {my && (
                <IconButton color="primary">
                  <DeleteIcon
                    onClick={() =>
                      deleteMessage(
                        message.id,
                        my ? message.to_username : message.from_username
                      )
                    }
                  ></DeleteIcon>
                </IconButton>
              )}

              {typeof message.message === "string" && (
                <IconButton
                  aria-label="fingerprint"
                  color="primary"
                  onClick={() => setReply(message.id)}
                >
                  <ReplyIcon />
                </IconButton>
              )}

              <IconButton
                aria-label="fingerprint"
                color="primary"
                onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
              >
                <EmojiEmotionsIcon />
              </IconButton>

              <IconButton
                aria-label="fingerprint"
                color="primary"
                onClick={() => setShowMore(false)}
              >
                <CancelIcon />
              </IconButton>
            </div>
          ) : (
            <MoreHorizIcon onClick={() => setShowMore(true)}></MoreHorizIcon>
          )}

          <div className={style.timeData}>{timeString}</div>
        </div>
      </div>
      <div className={style.fakeDiv}></div>
    </div>
  );
}
export default observer(Message);
