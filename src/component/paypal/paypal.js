import React, { useEffect, useState } from "react";
import api from "../../common/api";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../store";
import { useNavigate } from "react-router-dom";

function PayPal() {
  const store = useStore();
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState();
  useEffect(() => {
    (async () => {
      const res = await api.getCreditOrderID();
      if (res.status && res.data) {
        setOrderID(res.data);
      }
    })();
  }, []);
  return (
    orderID && (
      <PayPalButtons
        style={{
          label: "pay", // 讓按鈕顯示「Buy Now」
          layout: "horizontal",
        }}
        fundingSource="card"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // 金額
                },
                custom_id: orderID,
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING", // ✅ 不出貨，不顯示收件地址
              user_action: "PAY_NOW", // ✅ 按鈕上會顯示「Pay Now」
            },
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(async (details) => {
            store.tip.show(
              "付款完成，等待入帳中。處理完成後將通知您。",
              "success"
            );
            navigate("/");
          });
        }}
        onError={(err) => {
          console.error("付款錯誤：", err);
        }}
      />
    )
  );
}
export default observer(PayPal);
