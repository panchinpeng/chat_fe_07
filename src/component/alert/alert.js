import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Snackbar, Alert } from "@mui/material";
function CustomAlert(props, ref) {
  const timerID = useRef();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(() => props.severity);
  useImperativeHandle(ref, () => ({
    setMessage: (str) => {
      setSeverity(props.severity);
      setMessage(str);
    },
    setSeverity,
  }));
  useEffect(() => {
    timerID.current = setTimeout(() => {
      setMessage("");
      setSeverity(props.severity);
    }, [6000]);
    return () => {
      clearTimeout(timerID.current);
    };
  }, [message]);
  return (
    <Snackbar
      autoHideDuration={6000}
      open={message !== ""}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert variant="filled" severity={severity || "error"}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default forwardRef(CustomAlert);
