import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import Index from "./index";
import { useEffect } from "react";
import api from "../common/api";

function PrivateRoutes({ forceToLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();
  useEffect(() => {
    (async () => {
      const res = await api.getVerify();
      if (res.status) {
        store.user.setLogin(true);
        store.user.setInfo(res.data);
      } else {
        store.user.setLogin(false);
        forceToLogin && navigate("/login");
      }
    })();
  }, [location]);

  return <Index />;
}
export default observer(PrivateRoutes);
