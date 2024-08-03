import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import api from "../../common/api";
export default function FriendInvite({ friendUsername, closeFn, AddFriendFn }) {
  const sendInvite = async () => {
    const res = await api.AddFriend(friendUsername);
    AddFriendFn(res.status);
  };
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
        <Button onClick={sendInvite} autoFocus>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}
