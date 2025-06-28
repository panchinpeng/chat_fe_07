import { createContext } from "react";
import user from "./user";
import trends from "./trends";
import loading from "./loading";
import tip from "./tip";
import zoomImg from "./zoomImg";

export default createContext({
  user,
  trends,
  loading,
  tip,
  zoomImg,
});
