import { Box, Button } from "@mui/material";
import style from "./info.module.css";
import My from "./my";
import { useEffect, useState } from "react";
import InfoContext from "./infoContext.js";
import api from "../../common/api.js";

import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

function Info() {
  const store = useStore();
  const [person, setPerson] = useState({
    interests: [],
    job: "",
    wTime: "",
    salary: "",
    intro: "",
    public: true,
  });
  useEffect(() => {
    (async () => {
      const res = await api.getUserInfo();
      if (res.status) {
        setPerson({
          interests: res.data.interests ? res.data.interests.split(",") : [],
          job: res.data.job || "",
          wTime: res.data.work_time || "",
          salary: res.data.salary || "",
          intro: res.data.self_introd || "",
          public: res.data.public * 1 === 1,
        });
      }
    })();
  }, []);
  const checkPersonData = async () => {
    if (
      person.interests.length === 0 ||
      person.job === "" ||
      person.wTime === "" ||
      person.salary === "" ||
      person.intro === "" ||
      typeof person.public !== "boolean"
    ) {
      store.tip.show("請正確填寫資料", "error");
    } else {
      const res = await api.setUserInfo(
        person.job,
        person.wTime,
        person.salary,
        person.intro,
        person.interests.join(","),
        person.public
      );
      if (res.status) {
        store.tip.show("Saved", "success");
      } else {
        store.tip.show("Save Failed", "error");
      }
    }
  };
  return (
    <InfoContext.Provider value={{ person, setPerson }}>
      <Box className={style.box} sx={{ width: 1, p: 1 }}>
        <My></My>
        <div className={style.sendWrap}>
          <Button variant="contained" onClick={checkPersonData}>
            save
          </Button>
        </div>
      </Box>
    </InfoContext.Provider>
  );
}
export default observer(Info);
