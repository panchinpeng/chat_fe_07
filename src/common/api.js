import fetch from "./fetch";

export default {
  async logout(nevigate) {
    try {
      const res = await fetch("/api/user/logout");
      if (res.status) {
        nevigate("/login");
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
};
