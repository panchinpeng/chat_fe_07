import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
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
  const [USDTProtocols, setUSDTProtocols] = useState([]);
  const [selectProtocol, setSelectProtocol] = useState("");

  useEffect(() => {
    (async () => {
      if (selectProtocol) {
        store.loading.setLoading(true);
        setPayinfo(undefined);
        let paymentInfoRes = await api.getPaymentInfo(selectProtocol);
        if (paymentInfoRes.status && paymentInfoRes.data) {
          setPayinfo(paymentInfoRes.data);
        } else {
          setPayinfo("error");
        }
        store.loading.setLoading(false);
      }
    })();
  }, [selectProtocol]);
  useEffect(() => {
    (async () => {
      store.loading.setLoading(true);
      const protocols = await api.getUSDTProtocol();
      if (protocols && protocols.status) {
        setUSDTProtocols(protocols.data);
        store.loading.setLoading(false);
      }
    })();
  }, []);
  return (
    <Box sx={{ width: 1 }}>
      {USDTProtocols.length > 0 && (
        <>
          <div className={style.header}>
            <div className={style.title}>加密支付</div>
            <IconButton onClick={() => setOpenDesc(true)}>
              <HelpIcon></HelpIcon>
            </IconButton>
          </div>
          <div className={style.body}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id="selectProtocol">選擇網路</InputLabel>
              <Select
                labelId="selectProtocol"
                label="選擇網路"
                value={selectProtocol}
                onChange={(e) => {
                  setSelectProtocol(e.target.value);
                }}
              >
                <MenuItem disabled value="">
                  <em>請選擇網路</em>
                </MenuItem>
                {USDTProtocols.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {payinfo && (
              <>
                {payinfo === "error" ? (
                  <div className={style.protocolError}>
                    出錯了QQ 請選擇其他網路
                  </div>
                ) : (
                  <>
                    <div className={style.center}>
                      <img alt="usdt icon" src={usdtIcon} width="25"></img>
                      <span className={style.currency}>
                        {payinfo.pay_currency.toUpperCase()}
                      </span>
                    </div>
                    <Typography component="div" sx={{ mt: 2 }}>
                      付款金額
                    </Typography>
                    <Typography component="div" variant="h6">
                      {payinfo.price_amount} USDT
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      錢包地址
                    </Typography>
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
                      <span className={style.expireTime}>
                        {payinfo.expiration_estimate_date_seconds}
                      </span>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#f00", textAlign: "center", mt: 0.5 }}
                    >
                      請務必使用 {payinfo.pay_currency.toUpperCase()}{" "}
                      網路，若使用錯誤的鏈資金可能無法找回。
                    </Typography>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}

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
            <li>
              請用 "已選擇協議"
              網路的錢包付款進行轉帳操作。(例如：USDT-TRC20、USDT-ERC20...)
            </li>
            <li>複製上方顯示的錢包地址，或使用 QR Code 掃碼。</li>
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
