import { useEffect, useState } from "react";
import api from "../../common/api";
import Avatar from "../avatar/avatar";
import style from "./trendOverview.module.css";
export default function TrendOverride() {
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await api.getAllFriendTrends();
      if (res && res.status) {
        setTrends(res.data);
      }
    })();
  }, []);
  return (
    <div className={style.overviewWrap}>
      {trends.map((trend) => (
        <div key={trend.username}>
          <Avatar
            from="Index"
            friendName={trend.username}
            friendTrends={1}
          ></Avatar>
        </div>
      ))}
    </div>
  );
}
