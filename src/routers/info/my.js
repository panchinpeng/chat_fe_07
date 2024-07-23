import style from "./my.module.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Interest from "./interest";
import Job from "./job";
import Intro from "./intro";

export default function My() {
  return (
    <div>
      <Intro></Intro>
      <Job></Job>
      <Interest></Interest>
    </div>
  );
}
