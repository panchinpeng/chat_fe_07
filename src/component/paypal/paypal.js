// PayPalButton.jsx
import React from "react";
import api from "../../common/api";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPal() {
  return (
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
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING", // ✅ 不出貨，不顯示收件地址
            user_action: "PAY_NOW", // ✅ 按鈕上會顯示「Pay Now」
          },
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          const orderID = data.orderID;
          alert(`付款成功，買家姓名：${orderID}`);
          api.verifyPayPay(orderID);
          // TODO: 可送出 details 資料給後端確認交易
        });
      }}
      onError={(err) => {
        console.error("付款錯誤：", err);
      }}
    />
  );
}
