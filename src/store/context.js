import { createContext } from "react";
import user from "./user";
import trends from "./trends";

export default createContext({
  user,
  trends,
});
