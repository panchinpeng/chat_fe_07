import style from "./my.module.css";
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Intro from "./intro";

export default function My() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: 3,
        }}
      >
        <Intro></Intro>
      </Box>
    </div>
  );
}
