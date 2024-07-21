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
import PersonIcon from "@mui/icons-material/Person";

import LogoutIcon from "@mui/icons-material/Logout";
import PaymentIcon from "@mui/icons-material/Payment";
import { grey } from "@mui/material/colors";
import api from "../../common/api";
import { useNavigate } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

import CuAvatar from "./../avatar/avatar";

import style from "./menuRight.module.css";

function MenuRight({ open, setOpen }) {
  const store = useStore();
  const nevigate = useNavigate();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      SlideProps={{
        sx: {
          textAlign: "center",
        },
      }}
    >
      <Box
        sx={{
          margin: "10px auto 40px",
          borderRadius: 1,
          width: 1,
        }}
      >
        <CuAvatar></CuAvatar>
      </Box>
      <Box
        sx={{
          maxWidth: 500,
          color: grey[900],
          height: 1,
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => nevigate("/info")}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Information"
                sx={{
                  width: 200,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => {}}>
              <ListItemIcon>
                <PaymentIcon></PaymentIcon>
              </ListItemIcon>
              <ListItemText
                primary="payment"
                sx={{
                  width: 200,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
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
        </List>
      </Box>
    </Drawer>
  );
}
export default observer(MenuRight);
