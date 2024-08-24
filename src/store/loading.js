import { action, makeAutoObservable } from "mobx";

class Loading {
  constructor() {
    makeAutoObservable(this, {
      setLoading: action,
    });
  }
  loading = false;
  setLoading(status) {
    this.loading = status;
  }
}
const loading = new Loading();
export default loading;
