import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store/index";
function Tip() {
  const store = useStore();

  useEffect(() => {
    let timerID;
    if (store.tip.display) {
      timerID = setTimeout(() => {
        store.tip.close();
      }, 4000);
    }
    return () => {
      clearTimeout(timerID);
    };
  }, [store.tip.display]);

  return (
    <Snackbar
      sx={{ zIndex: 1000 }}
      autoHideDuration={4000}
      open={store.tip.display}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert variant="filled" severity={store.tip.severity}>
        {store.tip.message}
      </Alert>
    </Snackbar>
  );
}

export default observer(Tip);
