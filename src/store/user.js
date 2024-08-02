import { makeAutoObservable } from "mobx";
import api from "../common/api";

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
  async setAccount() {
    const res = await api.getAccountData();
    if (res.status && res.data) {
      this.account = res.data;
    }
  }
}

const user = new User();
export default user;
