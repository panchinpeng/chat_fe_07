import { useEffect, useState } from "react";
import api from "../../common/api";
import Avatar from "../avatar/avatar";
import style from "./trendOverview.module.css";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
function TrendOverride() {
  const store = useStore();
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    (async () => {
      if (store.trends.trendsData.length === 0 && store.trends.show === false) {
        const res = await api.getAllFriendTrends();
        if (res && res.status) {
          setTrends(res.data);
        }
      }
    })();
  }, [store.trends.trendsData, store.trends.show]);
  return (
    <div className={style.overviewWrap}>
      {trends.map((trend) => (
        <div key={trend.username}>
          <Avatar
            from="Index"
            friendName={trend.username}
            friendTrends={trend.readed > 0 ? 0 : 1}
          ></Avatar>
        </div>
      ))}
    </div>
  );
}
export default observer(TrendOverride);
