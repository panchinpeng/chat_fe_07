import { Box, Stepper, Step, StepLabel, Snackbar, Alert } from "@mui/material";
import style from "./info.module.css";
import My from "./my";
import { useState } from "react";
import Friend from "./friend";
import InfoContext from "./infoContext.js";

export default function Info() {
  const [step, setStep] = useState(0);
  const [warnMsg, setWarnMsg] = useState("");
  const [person, setPerson] = useState({
    interests: [],
    job: "",
    wTime: "",
    salary: "",
    intro: "",
  });
  return (
    <InfoContext.Provider value={{ person, setPerson }}>
      <Box className={style.box} sx={{ width: 1 }}>
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{ maxWidth: "600px", margin: "auto" }}
        >
          {["My", "Friend's"].map((label, index) => (
            <Step
              key={label}
              onClick={() => {
                if (index === 1) {
                  // check person
                  if (
                    person.interests.length === 0 ||
                    person.job === "" ||
                    person.wTime === "" ||
                    person.salary === "" ||
                    person.intro === ""
                  ) {
                    setWarnMsg(
                      "Your information is incomplete. Please check and fill out all required fields."
                    );
                  }
                }
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            margin: "10px auto",
            padding: "10px",
          }}
        >
          {step === 0 && <My></My>}
          {step === 1 && <Friend></Friend>}
        </Box>

        <Snackbar
          autoHideDuration={6000}
          open={warnMsg}
          onClose={() => setWarnMsg("")}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert variant="filled" severity="error">
            {warnMsg}
          </Alert>
        </Snackbar>
      </Box>
    </InfoContext.Provider>
  );
}
