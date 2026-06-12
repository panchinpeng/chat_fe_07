import { Box } from "@mui/material";

import UserSlide from "../userSlide/userSlide";
import { useEffect, useState } from "react";
import api from "../../common/api";
import style from "./recommendFriend.module.css";

export default function RecommendedFriend() {
  const [recommend, setRecommend] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await api.getRecommendFriend();
      if (res.status) {
        setRecommend(res.data);
      }
    })();
  }, []);
  return (
    <Box className={style.wrap}>
      {recommend && (
        <>
          <UserSlide type="history" data={recommend.history} variant="recommend"></UserSlide>
          <UserSlide type="new" data={recommend.latest} variant="recommend"></UserSlide>
          <UserSlide type="popular" data={recommend.popular} variant="recommend"></UserSlide>
          {/* <UserSlide type="online"></UserSlide> */}
          <UserSlide type="article" data={recommend.topPoster} variant="recommend"></UserSlide>
        </>
      )}
    </Box>
  );
}
