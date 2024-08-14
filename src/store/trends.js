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
  async getTrend(username) {
    const res = await api.getTrends(username);
    if (res && res.status && res.data.length) {
      runInAction(() => {
        this.trendsData = res.data;
        this.show = true;
      });
    }
  }
  closeTrend() {
    this.show = false;
    this.trendsData = [];
  }
}
const trends = new Trends();
export default trends;
