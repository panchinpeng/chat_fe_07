import { useEffect, useState } from "react";
import style from "./userInterests.module.css";
import Chip from "@mui/material/Chip";
import api from "../../common/api";
export function UserInterests({ interests }) {
  return (
    <div className={style.userInterestsWrap}>
      {interests &&
        interests
          .split(",")
          .map((interest) => (
            <Chip
              size="small"
              color="warning"
              label={interest}
              key={interest}
              sx={{ mb: 0.5, mr: 0.5 }}
            />
          ))}
    </div>
  );
}
