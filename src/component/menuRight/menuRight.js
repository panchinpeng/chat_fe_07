import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import style from "./menuRight.module.css";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { grey } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
import CuAvatar from "./../avatar/avatar";

const menu = [
  {
    title: "新增限動",
    page: "/member/post",
    icon: <AddCircleOutlineIcon></AddCircleOutlineIcon>,
  },
  {
    title: "新增貼文",
    page: "/member/article",
    icon: <PostAddIcon></PostAddIcon>,
  },
  {
    title: "資訊",
    page: "/member/info",
    icon: <PersonIcon></PersonIcon>,
  },
  // {
  //   title: "歷史",
  //   page: "/history",
  //   icon: <HistoryIcon></HistoryIcon>,
  // },
  {
    title: "好友",
    page: "/member/addFriend",
    icon: <PersonAddIcon></PersonAddIcon>,
  },
  {
    title: "登出",
    page: "/logout",
    icon: <LogoutIcon></LogoutIcon>,
  },
];

function MenuRight({ open, setOpen }) {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [refreshBalance, setRefreshBalance] = useState(false);

  const refreshFn = async () => {
    setRefreshBalance(true);
    await store.user.verify();
    setTimeout(() => {
      setRefreshBalance(false);
    }, 1000);
  };

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
            <div onClick={() => setOpen(false)}>
              <CuAvatar></CuAvatar>
            </div>
          </Box>
          <Box
            sx={{
              background: "linear-gradient(135deg, #3f51b5, #5c6bc0);",
              borderRadius: "12px",
              padding: 1,
              color: "#fff",
              mx: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              textAlign: "left",
              position: "relative",
            }}
          >
            <Typography sx={{ display: "flex", mb: 1 }}>
              <AccountBalanceWalletIcon></AccountBalanceWalletIcon>
              &nbsp;餘額
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", fontSize: 18, display: "flex" }}
            >
              {store.user.account.balance}
              <RefreshIcon
                className={refreshBalance ? style.rotate : ""}
                sx={{ mt: "2px", ml: "6px" }}
                onClick={refreshFn}
              ></RefreshIcon>
            </Typography>
            <Button
              variant="contained"
              sx={{ position: "absolute", top: 10, right: 10 }}
              onClick={() => {
                setOpen(false);
                navigate("/pay");
              }}
            >
              充值
            </Button>
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
              {menu.map((item) => (
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
