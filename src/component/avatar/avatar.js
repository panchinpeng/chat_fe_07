import { Badge, Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { grey } from "@mui/material/colors";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
function CuAvatar({ from }) {
  const store = useStore();
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <AddPhotoAlternateIcon
          sx={{ color: grey[900], fontSize: from !== "my" ? 30 : 40 }}
        ></AddPhotoAlternateIcon>
      }
    >
      <Avatar
        sx={
          from !== "my"
            ? { width: 80, height: 80 }
            : { width: 160, height: 160 }
        }
      >
        {store.user.info.username.substr(0, 1).toUpperCase()}
      </Avatar>
    </Badge>
  );
}

export default observer(CuAvatar);
