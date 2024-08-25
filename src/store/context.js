import { createContext } from "react";
import user from "./user";
import trends from "./trends";
import loading from "./loading";

export default createContext({
  user,
  trends,
  loading,
});
