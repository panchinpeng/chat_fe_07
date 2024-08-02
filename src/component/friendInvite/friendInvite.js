import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
export default function FriendInvite({ friendUsername, closeFn }) {
  return (
    <Dialog
      open={friendUsername !== ""}
      onClose={closeFn}
      aria-labelledby="addFriendTitle"
      aria-describedby="addFriend"
    >
      <DialogTitle id="addFriendTitle">確定要送出交友邀請?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          温馨提示：请确认对方的个人资料是否真实可靠。请谨慎交友，避免透露个人敏感信息。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFn}>取消</Button>
        <Button onClick={closeFn} autoFocus>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}
