import { action, makeAutoObservable, runInAction } from "mobx";
import api from "../common/api";

class User {
  login = undefined;
  account = {};
  constructor() {
    makeAutoObservable(this, {
      setLogin: action,
      changeUnread: action,
      clear: action,
    });
  }
  setLogin(status) {
    this.login = status;
  }
  changeUnread(count) {
    this.account.unread = count;
  }
  async verify() {
    const res = await api.getVerify();
    runInAction(() => {
      if (res.status) {
        this.login = true;
        this.account = res.data;
      } else {
        this.login = false;
      }
    });
    return res;
  }
  clear() {
    this.account = {};
  }
}

const user = new User();
export default user;
