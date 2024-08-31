import fetch from "./fetch";

const api = {
  async logout() {
    try {
      const res = await fetch("/api/user/logout");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getRecommendFriend() {
    try {
      const res = await fetch("/api/user/recommendFriend");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getVerify() {
    try {
      const res = await fetch("/api/user/verify");
      return res;
    } catch (e) {
      throw Promise.reject(e);
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
      throw Promise.reject(e);
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
      const res = await fetch("/api/user/info", {
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
      const res = await fetch("/api/user/account");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getUserInfo() {
    try {
      const res = await fetch("/api/user/info");
      return res;
    } catch (e) {
      throw Promise.reject(e);
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
      throw Promise.reject(e);
    }
  },
  async getAvatar() {
    try {
      const res = await fetch("/api/user/avatar");
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

      const res = await fetch("/api/trends/add", {
        method: "POST",
        headers: {},
        body: fd,
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async addPostArticle(
    message,
    place,
    isReply,
    isThumb,
    isPrivate,
    images,
    status
  ) {
    if (
      !message ||
      !place ||
      typeof isReply !== "boolean" ||
      typeof isThumb !== "boolean" ||
      typeof isPrivate !== "boolean" ||
      !Array.isArray(images)
    ) {
      return;
    }
    if (![0, 1].includes(status)) {
      return;
    }

    const fd = new FormData();
    fd.append("message", message);
    fd.append("place", JSON.stringify(place));
    fd.append("isReply", isReply);
    fd.append("isThumb", isThumb);
    fd.append("isPrivate", isPrivate);
    fd.append("status", status);
    images.map((image) => {
      fd.append("images", image);
    });

    const res = await fetch("/api/article/add", {
      method: "POST",
      headers: {},
      body: fd,
    });
    return res;
    try {
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async searchFriend(keyword) {
    keyword = keyword.trim();
    try {
      const res = await fetch("/api/user/searchUser", {
        method: "POST",
        body: { keyword },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async addFriend(friendUsername) {
    try {
      const res = await fetch("/api/user/addFriend", {
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
      const res = await fetch("/api/user/friendApply");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async setFriendApply(action, distUsername) {
    try {
      const res = await fetch("/api/user/friendApplyAction", {
        method: "POST",
        body: { action, distUsername },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getFriend() {
    try {
      const res = await fetch("/api/user/friend");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getMessageHistory(friend) {
    try {
      const res = await fetch("/api/message/history", {
        method: "POST",
        body: { friend },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getSingleHistory(friend, q) {
    try {
      const res = await fetch("/api/message/singleHistory", {
        method: "POST",
        body: { friend, q },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getAllFriendTrends() {
    try {
      const res = await fetch("/api/trends/allFriendTrends");
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getTrends(user) {
    try {
      const res = await fetch("/api/trends/getUserTrends", {
        method: "POST",
        body: { user },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async watchTrends(eid) {
    try {
      const res = await fetch("/api/trends/watch", {
        method: "POST",
        body: { eid },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async searchPlace(q) {
    try {
      const res = await fetch("/api/article/place", {
        method: "POST",
        body: { q },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getArticle(page, fid) {
    try {
      const res = await fetch(
        `/api/article?page=${page}${fid ? "&fid=" + fid : ""}`
      );
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async getThumb(id) {
    try {
      const res = await fetch("/api/article/getThumb", {
        method: "POST",
        body: { id },
      });
      return res;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
  async setThumb(id) {
    try {
      const res = await fetch("/api/article/setThumb", {
        method: "POST",
        body: {
          id,
        },
      });
      return res.data;
    } catch (e) {
      throw Promise.reject(e);
    }
  },
};
export default api;
