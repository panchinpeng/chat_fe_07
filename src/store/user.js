import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class User {
  login = undefined;
  info = null;
  account = {};
  constructor() {
    makeAutoObservable(this);
  }
  setLogin(status) {
    this.login = status;
  }
  setInfo(info) {
    this.info = info;
  }
  setAccount(account) {
    this.account = account;
  }
}

const user = new User();
export default user;
