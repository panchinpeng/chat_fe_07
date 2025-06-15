import { Box } from "@mui/material";
import { FacebookSelector } from "@charkour/react-reactions";
export default function Emoji({ sendReaction, open }) {
  const selectEmoji = (key) => {
    sendReaction(key);
  };
  return (
    <Box
      sx={{
        mt: open ? 1 : 0,
        whiteSpace: "nowrap",
        position: "relative",
        zIndex: "10",
      }}
    >
      {open && (
        <FacebookSelector
          showReactsOnly={true}
          iconSize={32}
          onSelect={selectEmoji}
        />
      )}
    </Box>
  );
}
