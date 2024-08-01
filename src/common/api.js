import fetch from "./fetch";

export default {
  async logout(nevigate, cb) {
    try {
      const res = await fetch("/api/user/logout");
      if (res.status) {
        cb instanceof Function && cb();
        nevigate("/");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async getRecommendFriend() {
    try {
      const res = await fetch("/api/user/recommendFriend");
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async getVerify() {
    try {
      const res = await fetch("/api/user/verify");
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async login(username, password) {
    try {
      const res = await fetch("/api/user/login", {
        body: { username, password },
        method: "POST",
      });
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async regester(username, password, birthday) {
    try {
      const res = await fetch("/api/user/register", {
        body: { username, password, birthday },
        method: "POST",
      });
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async setUserInfo(job, work_time, salary, self_introd, interests) {
    try {
      const res = await fetch("/api/user/info", {
        body: { job, work_time, salary, self_introd, interests },
        method: "POST",
      });
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async getAccountData() {
    try {
      const res = await fetch("/api/user/account");
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async getUserInfo() {
    try {
      const res = await fetch("/api/user/info");
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async setAvatar(fd) {
    try {
      const res = await fetch("/api/user/avatar", {
        method: "POST",
        headers: {},
        body: fd,
      });
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async getAvatar() {
    try {
      const res = await fetch("/api/user/avatar");
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async addPost(message, privateString, color, image, pos) {
    const fd = new FormData();
    try {
      JSON.parse(pos);
      color = /^#[0-9a-f]+$/is.test(color) ? color : "#fff";
      privateString = privateString * 1 === 1 ? 1 : 0;
      message = message ? message : "";
      fd.append("image", image);
      fd.append("message", message);
      fd.append("private", privateString);
      fd.append("color", color);
      fd.append("pos", pos);

      const res = await fetch("/api/trends/add", {
        method: "POST",
        headers: {},
        body: fd,
      });
      return res;
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
