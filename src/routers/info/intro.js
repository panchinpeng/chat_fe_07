import { Box, FormControl, FormLabel, Snackbar, Alert } from "@mui/material";
import CuAvatar from "./../../component/avatar/avatar";
import style from "./intro.module.css";
import InfoContext from "./infoContext";
import { useContext, useState } from "react";
export default function Intro() {
  const { person, setPerson } = useContext(InfoContext);
  const [warnMsg, setWarnMsg] = useState("");
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        borderRadius: 3,
      }}
    >
      <h3>Personal Introduction</h3>
      <Box sx={{ textAlign: "center" }}>
        <CuAvatar from="my"></CuAvatar>
        <Box sx={{ mt: 4, textAlign: "left" }}>
          <FormControl sx={{ width: "100%" }}>
            <FormLabel id="job_time">Share Your Self-Introduction</FormLabel>
            <textarea
              rows={3}
              className={style.textarea}
              placeholder="Share a short introduction😄"
              value={person.intro}
              onChange={(e) => {
                if (e.target.value.length > 100) {
                  setWarnMsg("max 100 character!");
                  return;
                }
                setPerson((person) => ({ ...person, intro: e.target.value }));
              }}
            ></textarea>
          </FormControl>
        </Box>
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
  );
}
