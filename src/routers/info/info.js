import { Box, Button } from "@mui/material";
import style from "./info.module.css";
import Alert from "../../component/alert/alert.js";
import My from "./my";
import { useEffect, useRef, useState } from "react";
import InfoContext from "./infoContext.js";
import api from "../../common/api.js";

export default function Info() {
  const alertRef = useRef();
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
      alertRef.current.setMessage("請正確填寫資料");
      alertRef.current.setSeverity("error");
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
        alertRef.current.setMessage("Saved");
        alertRef.current.setSeverity("success");
      } else {
        alertRef.current.setMessage("Save Failed");
        alertRef.current.setSeverity("error");
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

        <Alert ref={alertRef} severity="success"></Alert>
      </Box>
    </InfoContext.Provider>
  );
}
