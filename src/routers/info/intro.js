import { Box, FormControl, FormLabel, Paper } from "@mui/material";
import CuAvatar from "./../../component/avatar/avatar";
import Alert from "../../component/alert/alert";
import style from "./intro.module.css";
import InfoContext from "./infoContext";
import { useContext, useRef } from "react";
export default function Intro() {
  const { person, setPerson } = useContext(InfoContext);
  const warnRef = useRef();
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        borderRadius: 3,
      }}
    >
      <Paper elevation="2" sx={{ p: 2 }}>
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
                    warnRef.current.setMessage("max 100 character!");
                    return;
                  }
                  setPerson((person) => ({ ...person, intro: e.target.value }));
                }}
              ></textarea>
            </FormControl>
          </Box>
        </Box>
        <Alert ref={warnRef} severity="error"></Alert>
      </Paper>
    </Box>
  );
}
