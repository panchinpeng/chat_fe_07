import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
function Logout() {
  const navigate = useNavigate();
  const store = useStore();
  useEffect(() => {
    (async () => {
      store.user.clear();
      store.trends.closeTrend();
      const res = await api.logout();
      if (res && res.status) {
        store.user.setLogin(false);
      }
      navigate("/login");
    })();
  }, []);
  return <div></div>;
}

export default observer(Logout);
