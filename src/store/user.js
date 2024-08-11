import { makeAutoObservable } from "mobx";
import api from "../common/api";

class User {
  login = undefined;
  account = {};
  constructor() {
    makeAutoObservable(this);
  }
  setLogin(status) {
    this.login = status;
  }
  changeUnread(count) {
    this.account.unread = count;
  }
  async verify() {
    const res = await api.getVerify();
    if (res.status) {
      this.login = true;
      this.account = res.data;
    } else {
      this.login = false;
    }
    return res;
  }
}

const user = new User();
export default user;
