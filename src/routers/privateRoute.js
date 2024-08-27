import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import Index from "./index";
import { useEffect, useRef } from "react";
import Header from "./../component/header/header";
import Footer from "./../component/footer/footer";

function PrivateRoutes({ forceToLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const intervalID = useRef();
  const store = useStore();

  useEffect(() => {
    const checkLogin = async (callback) => {
      const res = await store.user.verify();
      if (res.status) {
        callback instanceof Function && callback();
      } else {
        forceToLogin && navigate("/logout");
      }
    };
    if (location.pathname === "/logout") {
      return;
    }
    checkLogin(() => {
      intervalID.current = setInterval(() => {
        store.trends.getAllFriendTrends();
        checkLogin();
      }, 60000);
    });

    return () => {
      clearInterval(intervalID.current);
    };
  }, [location]);
  if (forceToLogin) {
    return store.user.login ? (
      <>
        <Header></Header>
        <Index />
        <Footer></Footer>
      </>
    ) : (
      ""
    );
  }

  return (
    <>
      <Header></Header>
      <Index />
      <Footer></Footer>
    </>
  );
}
export default observer(PrivateRoutes);
