import React from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import style from "./messageUploadFile.module.css";
import Button from "@mui/material/Button";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function MessageUploadFile({ image, handleClose, submitFile }) {
  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={true}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>確定上傳嗎?</DialogTitle>
      <DialogContent>
        <img
          alt="聊天室上傳圖片"
          src={image}
          className={style.previewImg}
        ></img>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={submitFile}>確定</Button>
      </DialogActions>
    </Dialog>
  );
}
export default MessageUploadFile;
