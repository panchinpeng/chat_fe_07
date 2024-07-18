import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../common/api";
import style from "./recommendFriend.module.css";
export default function RecommendedFriend({ open }) {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    (async () => {
      if (open) {
        const res = await api.getRecommendFriend();
        if (res.status && res.data.length > 0) {
          setPersons(res.data);
        }
      }
    })();
  }, [open]);
  return (
    <Box>
      {persons.length > 0 ? (
        <div></div>
      ) : (
        <div className={style.notfoundUser}>
          <div className={style.cryIcon}>😢</div>
          <div>Oh no, there's no one.</div>
        </div>
      )}
    </Box>
  );
}
