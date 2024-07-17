import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class User {
  login = false;
  info = null;
  constructor() {
    makeAutoObservable(this);
  }
  setLogin(status) {
    this.login = status;
  }
  setInfo(info) {
    this.info = info;
  }
}

const user = new User();
export default user;
