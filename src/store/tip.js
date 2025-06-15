import { makeAutoObservable, action, runInAction } from "mobx";
class Tip {
  message = "";
  severity = "success";
  display = false;
  timerID = "";

  constructor() {
    makeAutoObservable(this, {
      show: action,
      close: action,
    });
  }
  show(msg, severity) {
    this.severity = severity;
    this.message = msg;
    this.display = true;
    clearTimeout(this.timerID);
  }
  close() {
    this.display = false;
    runInAction(() => {
      this.timerID = setTimeout(() => {
        this.message = "";
        this.severity = "success";
      }, 400);
    });
  }
}
const tip = new Tip();
export default tip;
