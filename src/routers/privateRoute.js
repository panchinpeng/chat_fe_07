import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import Index from "./index";
import { useEffect, useCallback, useRef } from "react";
import api from "../common/api";

function PrivateRoutes({ forceToLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const intervalID = useRef();
  const store = useStore();
  const checkLogin = useCallback(async (callback) => {
    const res = await api.getVerify();
    if (res.status) {
      store.user.setLogin(true);
      store.user.setInfo(res.data);
      callback instanceof Function && callback();
    } else {
      store.user.setLogin(false);
      forceToLogin && navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/logout") {
      return;
    }
    checkLogin(() => {
      intervalID.current = setInterval(() => {
        checkLogin();
      }, 60000);
    });

    return () => {
      clearInterval(intervalID.current);
    };
  }, [location]);

  useEffect(() => {
    (async () => {
      if (store.user.login) {
        store.user.setAccount();
      }
    })();
  }, [store.user.login]);

  return <Index />;
}
export default observer(PrivateRoutes);
