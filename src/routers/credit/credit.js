import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPal from "./../../component/paypal/paypal";

function Credit() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AaR1Oh680Z4rNNhf1rfqb0FWDkO_xKpLKnNRlDa6HESQa9T7g44ltu0DRHxVZjJm-CeLogypVZJXET0F",
        currency: "USD",
      }}
    >
      <div style={{ width: "100%", padding: "10px" }}>
        <PayPal />
      </div>
    </PayPalScriptProvider>
  );
}
export default Credit;
