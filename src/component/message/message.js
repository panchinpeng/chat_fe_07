import { useStore } from "./../../store";
import { observer } from "mobx-react-lite";
import style from "./message.module.css";
import Avatar from "./../avatar/avatar";
function Message({ message }) {
  const store = useStore();
  const my = store.user.info.username === message.from_username;
  const time = new Date(Date.parse(message.send_time));
  const timeString = `${(time.getMonth() + 1).toString().padStart(2, "0")}-${time.getDate().toString().padStart(2, "0")} ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
  return (
    <div className={`${style.message} ${my ? style.right : style.left}`}>
      <Avatar
        from="Index"
        friendName={my ? undefined : message.from_username}
      ></Avatar>
      <div className={style.messageWrap}>
        <div className={style.messageContent}>{message.message}</div>
        <div className={style.time}>{timeString}</div>
      </div>
    </div>
  );
}
export default observer(Message);
