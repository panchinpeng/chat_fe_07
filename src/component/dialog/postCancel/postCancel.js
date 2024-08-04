import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function PostCancel({ open, closeFn }) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={() => closeFn(false)}>
      <DialogTitle>確定要離開?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          我們無法自動儲存您的編輯內容。建議在繼續之前先複製您的文案，以防止意外的資料丟失。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate(-1)}>確定離開</Button>
        <Button onClick={() => closeFn(false)} autoFocus>
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
}
