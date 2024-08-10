import fetch from "./fetch";

const api = {
  async logout() {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/logout");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getRecommendFriend() {
    try {
      const res = await fetch(
        "http://192.168.50.198:3001/api/user/recommendFriend"
      );
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getVerify() {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/verify");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async login(username, password) {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/login", {
        body: { username, password },
        method: "POST",
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async regester(username, password, birthday) {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/register", {
        body: { username, password, birthday },
        method: "POST",
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async setUserInfo(
    job,
    work_time,
    salary,
    self_introd,
    interests,
    publicData
  ) {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/info", {
        body: {
          job,
          work_time,
          salary,
          self_introd,
          interests,
          public: publicData,
        },
        method: "POST",
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getAccountData() {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/account");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getUserInfo() {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/info");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async setAvatar(fd) {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/avatar", {
        method: "POST",
        headers: {},
        body: fd,
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getAvatar() {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/avatar");
      return res;
    } catch (e) {
      throw Promise.reject(e);
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

      const res = await fetch("http://192.168.50.198:3001/api/trends/add", {
        method: "POST",
        headers: {},
        body: fd,
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async searchFriend(keyword) {
    keyword = keyword.trim();
    try {
      const res = await fetch(
        "http://192.168.50.198:3001/api/user/searchUser",
        {
          method: "POST",
          body: { keyword },
        }
      );
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async addFriend(friendUsername) {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/addFriend", {
        method: "POST",
        body: { friendUsername },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getFriendApply() {
    try {
      const res = await fetch(
        "http://192.168.50.198:3001/api/user/friendApply"
      );
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async setFriendApply(action, distUsername) {
    try {
      const res = await fetch(
        "http://192.168.50.198:3001/api/user/friendApplyAction",
        {
          method: "POST",
          body: { action, distUsername },
        }
      );
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getFriend() {
    try {
      const res = await fetch("http://192.168.50.198:3001/api/user/friend");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getMessageHistory(friend) {
    try {
      const res = await fetch(
        "http://192.168.50.198:3001/api/message/history",
        {
          method: "POST",
          body: { friend },
        }
      );
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
};
export default api;
