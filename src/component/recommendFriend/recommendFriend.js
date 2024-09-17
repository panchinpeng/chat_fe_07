import { Box } from "@mui/material";

import UserSlide from "../userSlide/userSlide";
import { useEffect, useState } from "react";
import api from "../../common/api";

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
    <Box>
      {recommend && (
        <>
          <UserSlide type="history" data={recommend.history}></UserSlide>
          <UserSlide type="new" data={recommend.latest}></UserSlide>
          <UserSlide type="popular" data={recommend.popular}></UserSlide>
          {/* <UserSlide type="online"></UserSlide> */}
          <UserSlide type="article" data={recommend.topPoster}></UserSlide>
        </>
      )}
    </Box>
  );
}
