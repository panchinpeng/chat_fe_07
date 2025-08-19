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
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import usdtIcon from "./../../public/usdt.png";
import api from "../../common/api";
import { QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import { useNavigate } from "react-router-dom";

import style from "./crypto.module.css";

function Crypto() {
  const store = useStore();
  const navigate = useNavigate();
  const [openDesc, setOpenDesc] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [payinfo, setPayinfo] = useState(undefined);
  const [USDTProtocols, setUSDTProtocols] = useState([]);
  const [selectProtocol, setSelectProtocol] = useState(undefined);
  const [limitPrice, setLimitPrice] = useState({ min: 0, max: 0 });
  const [amount, setAmount] = useState(0);

  const createDeposit = async () => {
    if (amount > limitPrice.max || amount < limitPrice.min || amount <= 0) {
      return;
    }
    store.loading.setLoading(true);
    setPayinfo(undefined);
    let paymentInfoRes = await api.getPaymentInfo(
      selectProtocol.currency,
      amount
    );
    if (paymentInfoRes.status && paymentInfoRes.data) {
      setPayinfo(paymentInfoRes.data);
    } else {
      setPayinfo("error");
    }
    store.loading.setLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (selectProtocol) {
        setLimitPrice({
          min: Math.round(selectProtocol.min_amount),
          max: Math.round(selectProtocol.max_amount),
        });
      }
    })();
  }, [selectProtocol]);
  useEffect(() => {
    (async () => {
      store.loading.setLoading(true);
      const protocols = await api.getUSDTProtocol();
      if (protocols && protocols.status) {
        if (protocols.data.fromOld) {
          setPayinfo(protocols.data);
        } else {
          setUSDTProtocols(protocols.data);
        }
        store.loading.setLoading(false);
      } else {
        setPayinfo("error");
      }
      store.loading.setLoading(false);
    })();
  }, [store.loading]);
  return (
    <Box sx={{ width: 1 }}>
      {payinfo === "error" && (
        <div className={style.protocolError}>出錯了QQ </div>
      )}
      {payinfo && (
        <div
          className={`${style.cancelWrap} ${USDTProtocols.length <= 0 ? style.noSelectProtocols : ""}`}
        >
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            size="large"
            onClick={() => setOpenCancelDialog(true)}
          >
            取消付款
          </Button>
        </div>
      )}
      {USDTProtocols.length > 0 && (
        <>
          <div className={`${style.payInfo} ${payinfo ? style.mark : ""}`}>
            <div className={style.header}>
              <div className={style.title}>加密貨幣支付</div>
              <IconButton onClick={() => setOpenDesc(true)}>
                <HelpIcon></HelpIcon>
              </IconButton>
            </div>
            <div className={style.body}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="selectProtocol">選擇網路</InputLabel>
                <Select
                  labelId="selectProtocol"
                  label="選擇網路"
                  value={selectProtocol?.currency || ""}
                  onChange={(e) => {
                    const selectProtocol = USDTProtocols.find(
                      (protocol) => protocol.currency === e.target.value
                    );
                    setSelectProtocol(selectProtocol);
                  }}
                >
                  <MenuItem disabled value="">
                    <em>請選擇網路</em>
                  </MenuItem>
                  {USDTProtocols.map((p) => (
                    <MenuItem key={p.currency} value={p.currency}>
                      {p.currency.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectProtocol && (
                <>
                  <div>輸入充值金額</div>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      placeholder="輸入充值金額"
                      error={amount > limitPrice.max || amount < limitPrice.min}
                      value={amount}
                      onChange={(e) =>
                        setAmount(e.target.value.replace(/\D/g, ""))
                      }
                      endAdornment={
                        <InputAdornment position="end">USDT</InputAdornment>
                      }
                    />
                  </FormControl>
                  <div>
                    最低付款金額:{" "}
                    <span className={style.minmaxAmount}>
                      {limitPrice.min} USDT
                    </span>{" "}
                    最高付款金額:{" "}
                    <span className={style.minmaxAmount}>
                      {limitPrice.max} USDT
                    </span>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", mt: 2 }}
                    disabled={
                      amount > limitPrice.max ||
                      amount < limitPrice.min ||
                      amount <= 0
                    }
                    onClick={createDeposit}
                  >
                    送出
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
      {payinfo && payinfo !== "error" && (
        <div className={style.paymentDetail}>
          <>
            <Typography component="div" sx={{ mt: 2 }}>
              付款網路
            </Typography>
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
        </div>
      )}
      <USDTDesc open={openDesc} onClose={() => setOpenDesc(false)} />
      <CancelDialog
        open={openCancelDialog}
        onCancel={() => setOpenCancelDialog(false)}
        onSubmit={async () => {
          if (payinfo && payinfo.pay_currency) {
            const res = await api.cancelDeposit(payinfo.pay_currency);
            if (res.status === true && res.data.reload) {
              navigate("/dumy");
              setTimeout(() => {
                navigate("/pay");
              }, 0);
            }
          }
        }}
      ></CancelDialog>
    </Box>
  );
}
function CancelDialog({ open, onCancel, onSubmit }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle id="alert-dialog-title">確定要取消本次充值嗎?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          取消僅中止本次付款流程，若您已完成轉帳，系統將不會自動退款，請務必確認後再操作。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onSubmit}>確定</Button>
      </DialogActions>
    </Dialog>
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
              選擇支付協議 <br />
              請從下拉選單中選擇您要使用的 USDT
              協議（如：USDTTRC20、USDTERC20）。
            </li>
            <li>
              輸入充值金額
              <br />
              在欄位中輸入您要充值的金額（單位為
              USDT），系統將提示可接受的最小與最大金額。
            </li>
            <li>
              確認並送出
              <br />
              確認金額無誤後，點選「送出」按鈕，系統會為您建立本次付款資訊。
            </li>
            <li>
              查看付款資訊
              <br />
              畫面將顯示： 選擇的支付協議、應付款金額、專屬付款地址
            </li>
            <li>
              完成付款
              <br />
              請使用支援所選協議的錢包掃描 QR Code 或貼上付款地址完成轉帳。
            </li>
            <li>
              付款確認
              <br />
              系統會自動監控付款情況，確認完成後即顯示付款成功狀態，無需手動通知。
            </li>
          </ol>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
export default observer(Crypto);
