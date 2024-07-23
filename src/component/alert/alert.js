import { forwardRef, useImperativeHandle, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
function CustomAlert(props, ref) {
  const [message, setMessage] = useState("");
  useImperativeHandle(ref, () => ({
    setMessage,
  }));
  return (
    <Snackbar
      autoHideDuration={6000}
      open={message !== ""}
      onClose={() => setMessage("")}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert variant="filled" severity={props.severity || "error"}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default forwardRef(CustomAlert);
