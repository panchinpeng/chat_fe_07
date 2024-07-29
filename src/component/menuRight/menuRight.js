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
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
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
      {store.user.login ? (
        <>
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
                <ListItemButton
                  onClick={() => {
                    setOpen(false);
                    nevigate("/member/info");
                  }}
                >
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
                <ListItemButton
                  onClick={() =>
                    api.logout(nevigate, () => {
                      store.user.setLogin(false);
                    })
                  }
                >
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
        </>
      ) : (
        <Box
          sx={{
            maxWidth: 500,
            color: grey[900],
            height: 1,
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpen(false);
                  nevigate("/login");
                }}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText
                  primary="LOGIN"
                  sx={{
                    width: 200,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpen(false);
                  nevigate("/signup");
                }}
              >
                <ListItemIcon>
                  <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText
                  primary="SIGN UP"
                  sx={{
                    width: 200,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      )}
    </Drawer>
  );
}
export default observer(MenuRight);
