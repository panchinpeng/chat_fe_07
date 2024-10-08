import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import style from "./info.module.css";
import Alert from "../../component/alert/alert.js";
import My from "./my";
import { useEffect, useRef, useState } from "react";
import Friend from "./friend";
import InfoContext from "./infoContext.js";
import api from "../../common/api.js";

export default function Info() {
  const [step, setStep] = useState(0);
  const warnRef = useRef();
  const successRef = useRef();
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
      warnRef.current.setMessage(
        "Your information is incomplete. Please check and fill out all required fields."
      );
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
        successRef.current.setMessage("Saved");
      } else {
        warnRef.current.setMessage("Save Failed");
      }
    }
  };
  return (
    <InfoContext.Provider value={{ person, setPerson }}>
      <Box className={style.box} sx={{ width: 1, pt: 1 }}>
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{ maxWidth: "600px", margin: "auto" }}
        >
          {["My", "Friend's"].map((label, index) => (
            <Step key={label} onClick={checkPersonData}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            margin: "10px auto",
            maxWidth: "800px",
          }}
        >
          {step === 0 && <My></My>}
          {step === 1 && <Friend></Friend>}
          <div className={style.sendWrap}>
            <Button variant="contained" onClick={checkPersonData}>
              save
            </Button>
          </div>
        </Box>

        <Alert ref={warnRef} severity="error"></Alert>
        <Alert ref={successRef} severity="success"></Alert>
      </Box>
    </InfoContext.Provider>
  );
}
