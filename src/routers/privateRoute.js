import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import Index from "./index";
import { useEffect, useState } from "react";
import fetch from "../common/fetch";

function PrivateRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    setVerify(false);
    (async () => {
      const res = await fetch("/api/user/verify");
      if (res.status) {
        setVerify(true);
        store.user.setLogin(true);
        store.user.setInfo(res.data);
      } else {
        store.user.setLogin(false);
        navigate("/login");
      }
    })();
    return () => {
      setVerify(false);
    };
  }, [location]);

  return store.user.login && verify ? <Index /> : null;
}
export default observer(PrivateRoutes);
