import { useEffect, useState } from "react";
import api from "../../common/api";
import Avatar from "../avatar/avatar";
import style from "./trendOverview.module.css";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
function TrendOverride() {
  const store = useStore();

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
