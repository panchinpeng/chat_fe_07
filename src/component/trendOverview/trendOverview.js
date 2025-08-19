import { useEffect } from "react";
import Avatar from "../avatar/avatar";
import style from "./trendOverview.module.css";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
function TrendOverride() {
  const store = useStore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    store.trends.getAllFriendTrends();
  }, []);
  return (
    <div className={style.overviewWrap}>
      {store.trends.friendTrends &&
        store.trends.friendTrends.map((trend) => (
          <div key={trend.username}>
            <Avatar from="Index" friendName={trend.username}></Avatar>
          </div>
        ))}
    </div>
  );
}
export default observer(TrendOverride);
