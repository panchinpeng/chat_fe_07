import {
  Dialog,
  MenuList,
  MenuItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function PostType({ open, handleClose }) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MenuList sx={{ width: 200, maxWidth: "100%", textAlign: "center" }}>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/member/article");
          }}
        >
          <ListItemText>貼文</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/member/post");
          }}
        >
          <ListItemText>限動</ListItemText>
        </MenuItem>
      </MenuList>
    </Dialog>
  );
}
