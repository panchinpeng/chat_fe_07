import {
  SwipeableDrawer,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Fragment } from "react";
import style from "./friendApply.module.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import api from "../../common/api";
import CuAvatar from "../avatar/avatar";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
function FriendApply({ open, setOpen }) {
  const store = useStore();
  const [apply, setApply] = useState([]);
  const handleReject = async (item, index) => {
    const res = await api.setFriendApply("reject", item.username);
    if (res.status) {
      store.tip.show("成功拒絕好友邀請", "success");
      const cApply = [...apply];
      cApply.splice(index, 1);
      setApply(cApply);
      store.user.verify();
    } else {
      store.tip.show("發生錯誤，請重試", "error");
    }
  };
  const handleAccpet = async (item, index) => {
    const res = await api.setFriendApply("allow", item.username);
    if (res.status) {
      store.tip.show("已成為好友，趕快敲他聊天吧", "success");

      const cApply = [...apply];
      cApply.splice(index, 1);
      setApply(cApply);
      store.user.verify();
    } else {
      store.tip.show("發生錯誤，請重試", "error");
    }
  };
  useEffect(() => {
    (async () => {
      const res = await api.getFriendApply();
      if (res.status) {
        setApply(res.data);
      }
    })();
  }, []);
  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {}}
      >
        <h4 className={style.header}>好友邀請</h4>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {apply.map((item, index) => (
            <Fragment key={item.username}>
              <ListItem
                disableGutters
                sx={{ pr: "85px" }}
                secondaryAction={
                  <>
                    <IconButton
                      aria-label="accept"
                      onClick={() => handleAccpet(item, index)}
                    >
                      <CheckIcon
                        sx={{ fontSize: 28 }}
                        color="success"
                      ></CheckIcon>
                    </IconButton>
                    <IconButton
                      aria-label="cancel"
                      onClick={() => handleReject(item, index)}
                    >
                      <CloseIcon
                        sx={{ fontSize: 28 }}
                        color="error"
                      ></CloseIcon>
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={
                    <div className={style.applyItem}>
                      <CuAvatar
                        from="Index"
                        friendName={item.username}
                        friendTrends={0}
                      />
                      <div className={style.applyInfo}>
                        <div className={style.title}>{item.username}</div>
                        <div className={style.desc}>
                          {item.self_introd || "這個人很懶，沒有個人簡介"}
                        </div>
                      </div>
                    </div>
                  }
                  sx={{ ml: 1 }}
                />
              </ListItem>
              {index + 1 !== apply.length && <Divider></Divider>}
            </Fragment>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
}
export default observer(FriendApply);
