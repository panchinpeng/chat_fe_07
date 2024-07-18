import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import api from "../../common/api";
import { useNavigate } from "react-router-dom";
export default function MenuRight({ open, setOpen }) {
  const nevigate = useNavigate();
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          maxWidth: 500,
          color: grey[900],
          bgcolor: blue[50],
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => api.logout(nevigate)}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="logout"
                sx={{
                  width: 200,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="logout"
                sx={{
                  width: 200,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
