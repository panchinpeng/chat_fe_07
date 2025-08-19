import { Box } from "@mui/material";
import style from "./paySelect.module.css";
import usdtIcon from "./../../public/usdt.png";
import { useNavigate } from "react-router-dom";

import CreditCardIcon from "@mui/icons-material/CreditCard";
function PaySelect() {
  const navigate = useNavigate();
  const goPayPages = (url) => {
    navigate(url);
  };
  return (
    <Box>
      <div className={style.paySelect}>
        <div className={style.title}>充值方式: </div>
        <div
          className={style.payType}
          onClick={() => goPayPages("/pay/credit")}
        >
          <div className={style.horizon}>
            <CreditCardIcon className={style.icon}></CreditCardIcon>
            <div>信用卡支付</div>
          </div>

          <div className={style.payTypeDesc}>支援 Visa / MasterCard / JCB</div>
        </div>

        <div
          className={style.payType}
          onClick={() => goPayPages("/pay/crypto")}
        >
          <div className={style.horizon}>
            <img src={usdtIcon} className={style.icon}></img>
            <div>加密貨幣支付</div>
          </div>

          <div className={style.payTypeDesc}>支援 USDT</div>
        </div>
      </div>
    </Box>
  );
}
export default PaySelect;
