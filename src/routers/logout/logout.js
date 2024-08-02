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
      const res = await api.logout();
      if (res.status) {
        store.user.setLogin(false);
      }
      navigate("/");
    })();
  }, []);
  return <div></div>;
}

export default observer(Logout);
