import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HelpIcon from "@mui/icons-material/Help";
import usdtIcon from "./../../public/usdt.png";
import api from "../../common/api";
import { QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";

import style from "./pay.module.css";

function Pay() {
  const store = useStore();
  const [openDesc, setOpenDesc] = useState(false);
  const [payinfo, setPayinfo] = useState(undefined);
  useEffect(() => {
    let intervalID = "";
    (async () => {
      const resPayInfo = await api.getPaymentInfos();
      if (resPayInfo && resPayInfo.status) {
        setPayinfo(resPayInfo.data);
      }
    })();
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return (
    <Box sx={{ width: 1, p: 1 }}>
      <Card sx={{ p: 1 }}>
        <CardHeader
          title="加密支付"
          sx={{ borderBottom: 1, borderColor: "#e7e2e2" }}
          action={
            <IconButton onClick={() => setOpenDesc(true)}>
              <HelpIcon></HelpIcon>
            </IconButton>
          }
        ></CardHeader>
        {payinfo && (
          <CardContent>
            <div className={style.center}>
              <img alt="usdt icon" src={usdtIcon} width="25"></img>
              <span className={style.currency}>usdttrc20</span>
            </div>
            <Typography component="div" sx={{ mt: 2 }}>
              付款金額
            </Typography>
            <Typography component="div" variant="h6">
              {payinfo.price_amount} USDT
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>錢包地址</Typography>
            <Typography className={style.center}>
              <div className={style.limitWidth}>
                {payinfo.pay_address} &nbsp;
              </div>
              <CopyToClipboard
                text={payinfo.pay_address}
                onCopy={() => {
                  store.tip.show("已複製", "success");
                }}
              >
                <ContentCopyIcon></ContentCopyIcon>
              </CopyToClipboard>
            </Typography>
            <div className={style.qrcodeWrap}>
              <QRCodeSVG value={payinfo.pay_address} size="200" />
            </div>
            <Typography sx={{ textAlign: "center" }}>
              剩餘付款時間:{" "}
              <div className={style.expireTime}>
                {payinfo.expiration_estimate_date_seconds}
              </div>
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "#f00", textAlign: "center", mt: 0.5 }}
            >
              請務必使用 TRC20 網路，若使用錯誤的鏈（如
              ERC20），資金可能無法找回。
            </Typography>
          </CardContent>
        )}
      </Card>
      <USDTDesc open={openDesc} onClose={() => setOpenDesc(false)} />
    </Box>
  );
}
function USDTDesc({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>如何透過 USDT 進行充值？</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <ol>
            <li>請確認您使用的錢包支援 USDT-TRC20（TRON 網路）。</li>
            <li>將畫面上的 錢包地址 複製，或直接使用 QR Code 掃碼。</li>
            <li>匯入畫面所示的 "充值金額" 到該地址。</li>
            <li>匯款後系統會自動監控並確認付款，請耐心等待。</li>
            <li>本次充值有時間限制，請在倒數時間內完成付款。</li>
          </ol>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
export default observer(Pay);
