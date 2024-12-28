import { action, makeAutoObservable, runInAction } from "mobx";
import api from "../common/api";
class Trends {
  constructor() {
    makeAutoObservable(this, {
      closeTrend: action,
    });
  }
  show = false;
  trendsData = [];
  friendTrends = [];
  async getTrend(username) {
    const res = await api.getTrends(username);
    if (res && res.status && res.data.length) {
      runInAction(() => {
        this.trendsData = res.data;
        this.show = true;
      });
    } else if (res.status) {
      return "noTrend";
    }
  }
  async getAllFriendTrends() {
    const res = await api.getAllFriendTrends();
    if (res && res.status) {
      this.friendTrends = res.data;
    }
  }
  closeTrend() {
    this.show = false;
    this.trendsData = [];
  }
}
const trends = new Trends();
export default trends;
