import { Box, LinearProgress } from "@mui/material";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import style from "./trends.module.css";
import { useEffect, useRef, useState } from "react";
import api from "../../common/api";
function Trends() {
  const store = useStore();
  const [progress, setProgress] = useState(0);
  const [story, setStory] = useState(0);
  const timerID = useRef();
  const storyRecorded = useRef();
  const getComputedStyleOffset = (trend) => {
    const style = {};
    if (trend.pos.x && trend.pos.y) {
      style.transform =
        "translate(calc(-50% + " +
        trend.pos.x +
        "px), calc(-50% + " +
        trend.pos.y +
        "px))";
    }
    return style;
  };
  const getComputedStyleSkew = (trend) => {
    const style = {};
    if (trend.pos.r && trend.pos.s) {
      style.transform =
        "rotate(" + trend.pos.r + "deg)" + "scale(" + trend.pos.s + ")";
    }
    if (trend.pos.w) {
      style.width = trend.pos.w;
    }
    if (trend.pos.h) {
      style.height = trend.pos.h;
    }
    if (trend.color) {
      style.color = trend.color;
    }
    return style;
  };
  const getComputedStyleBg = (trend) => {
    const style = {};
    if (trend.image) {
      style.backgroundImage = `url(${process.env.REACT_APP_API_DOMAIN}${trend.image})`;
    }
    if (trend.pos.layoutX) {
      style.width = `${trend.pos.layoutX}px`;
    }
    if (trend.pos.layoutY) {
      style.height = `${trend.pos.layoutY}px`;
    }
    return style;
  };

  useEffect(() => {
    if (store.trends.show) {
      timerID.current = setInterval(() => {
        setProgress((progress) => progress + 100 / 45);
      }, 250);
    }
    return () => {
      clearInterval(timerID.current);
      setProgress(0);
      setStory(0);
    };
  }, [store.trends.show]);
  useEffect(() => {
    if (progress > 103 && store.trends.show) {
      if (story + 1 === store.trends.trendsData.length) {
        store.trends.closeTrend();
        return;
      }
      setStory(story + 1);
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    if (store.trends.show && story !== storyRecorded.current) {
      // call api .......
      if (store.trends.trendsData[story].readed !== 1) {
        api.watchTrends(store.trends.trendsData[story].eid);
      }

      storyRecorded.current = story;
    }
  }, [story, store.trends.show]);

  if (!store.trends.show || store.trends.trendsData.length === 0) {
    return null;
  }
  return (
    <div className={style.wrap}>
      <div className={style.timeLineWrap}>
        {store.trends.trendsData.map((item, index) => (
          <Box
            sx={{ width: `${100 / store.trends.trendsData.length}%`, mr: 0.5 }}
          >
            <LinearProgress
              key={item.id}
              color="secondary"
              variant="determinate"
              value={index < story ? 100 : index > story ? 0 : progress}
              className={style.timeLine}
            />
          </Box>
        ))}
      </div>

      <div
        className={style.trendsWrapper}
        style={getComputedStyleBg(store.trends.trendsData[story])}
      >
        <div
          key={store.trends.trendsData[story].id}
          className={style.trendsArea}
          style={getComputedStyleOffset(store.trends.trendsData[story])}
        >
          <div style={getComputedStyleSkew(store.trends.trendsData[story])}>
            {store.trends.trendsData[story].message}
          </div>
        </div>
      </div>
    </div>
  );
}
export default observer(Trends);
