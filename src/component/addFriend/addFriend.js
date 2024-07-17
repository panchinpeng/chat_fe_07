import React from "react";
import style from "./addFriend.module.css";
import RecommendedFriend from "./../recommendFriend/recommendFriend";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddFriend({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>search friend ...</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <div className={style.friendRecommend}>
            <h5 className={style.title}>Recommended for you.</h5>
            <RecommendedFriend open={open}></RecommendedFriend>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
}
