import { makeAutoObservable, action } from "mobx";
class ZoomImg {
  url = "";
  constructor() {
    makeAutoObservable(this, {
      watch: action,
      close: action,
    });
  }
  watch(url) {
    this.url = url;
  }
  close() {
    this.url = "";
  }
}
const zoomImg = new ZoomImg();
export default zoomImg;
