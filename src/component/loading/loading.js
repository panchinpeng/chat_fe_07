import { CircularProgress, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
function Loading({ from }) {
  const store = useStore();
  return (
    (from === "Suspense" || store.loading.loading) && (
      <Box
        sx={{
          textAlign: "center",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
          backgroundColor: "#dedddd8f",
        }}
      >
        <CircularProgress color="secondary"></CircularProgress>
      </Box>
    )
  );
}

export default observer(Loading);
