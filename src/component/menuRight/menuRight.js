import React from "react";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { grey } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
import CuAvatar from "./../avatar/avatar";
import style from "./menuRight.module.css";

const menu = [
  {
    title: "資訊",
    page: "/member/info",
    loginRequire: true,
    icon: <PersonIcon></PersonIcon>,
  },
  {
    title: "支付",
    page: "",
    loginRequire: true,
    icon: <PaymentIcon></PaymentIcon>,
  },
  {
    title: "好友",
    page: "/member/addFriend",
    loginRequire: true,
    icon: <PersonAddIcon></PersonAddIcon>,
  },
  {
    title: "登出",
    page: "/logout",
    loginRequire: true,
    icon: <LogoutIcon></LogoutIcon>,
  },
  {
    title: "登入",
    page: "/login",
    icon: <LoginIcon></LoginIcon>,
  },
  {
    title: "註冊",
    page: "/signup",
    icon: <AppRegistrationIcon></AppRegistrationIcon>,
  },
];

function MenuRight({ open, setOpen }) {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
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
      key={location.pathname}
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
            key="login_menu"
          >
            <List>
              {menu
                .filter((item) => item.loginRequire)
                .map((item) => (
                  <React.Fragment key={item.title}>
                    <ListItem disablePadding key={item.title}>
                      <ListItemButton
                        onClick={() => {
                          setOpen(false);
                          navigate(item.page);
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          sx={{
                            width: 200,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
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
            {menu
              .filter((item) => !item.loginRequire)
              .map((item) => (
                <React.Fragment key={item.title}>
                  <ListItem disablePadding key={item.title}>
                    <ListItemButton
                      onClick={() => {
                        navigate(item.page);
                        setOpen(false);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          width: 200,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
          </List>
        </Box>
      )}
    </Drawer>
  );
}
export default observer(MenuRight);
