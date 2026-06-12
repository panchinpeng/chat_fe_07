import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import Index from "./index";
import { useCallback, useEffect, useRef } from "react";
import Header from "./../component/header/header";

function PrivateRoutes({ forceToLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const intervalID = useRef();
  const store = useStore();

  const checkLogin = useCallback(
    async (callback) => {
      const res = await store.user.verify();
      if (res.status) {
        callback instanceof Function && callback();
      } else {
        forceToLogin && navigate("/logout");
      }
    },
    [store.user, forceToLogin, navigate]
  );

  useEffect(() => {
    if (location.pathname === "/logout") {
      return;
    }
    clearInterval(intervalID.current);
    checkLogin(() => {
      clearInterval(intervalID.current);
      intervalID.current = setInterval(() => {
        store.trends.getAllFriendTrends();
        checkLogin();
      }, 60000);
    });

    return () => {
      clearInterval(intervalID.current);
    };
  }, [location.pathname, checkLogin, store.trends]);
  if (forceToLogin) {
    return store.user.login ? (
      <>
        <Header></Header>
        <Index />
      </>
    ) : (
      ""
    );
  }

  return (
    <>
      <Header></Header>
      <Index />
    </>
  );
}
export default observer(PrivateRoutes);
