import React from "react";
import style from "./draft.module.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Draft({ open, setOpen, draft, setDraft, setDraftData }) {
  const store = useStore();
  if (draft.length === 0) {
    return null;
  }
  const pickDraft = (d) => {
    setDraftData(d);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteDraft = async (draftItem, event) => {
    event.stopPropagation();
    const confirmRes = window.confirm(
      `確定要移除 ${draftItem.time} 新增的內容?`
    );
    if (confirmRes) {
      const res = await api.deleteDraft(draftItem.id);
      console.log("res", res);
      if (res.data) {
        store.tip.show("已刪除", "success");
        const resetDraft = draft.filter((d) => d.id !== draftItem.id);
        setDraft(resetDraft);
      } else {
        store.tip.show("刪除失敗", "error");
      }
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        {draft.map((d) => (
          <React.Fragment key={d.id}>
            <ListItemButton onClick={() => pickDraft(d)}>
              <ListItemText
                primary={d.message}
                disableTypography={true}
                secondary={
                  <div>
                    <div className={style.time}>{d.time}</div>
                    <div>
                      <DeleteIcon
                        className={style.delete}
                        onClick={(e) => deleteDraft(d, e)}
                      ></DeleteIcon>
                    </div>
                  </div>
                }
              />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Dialog>
  );
}

export default observer(Draft);
