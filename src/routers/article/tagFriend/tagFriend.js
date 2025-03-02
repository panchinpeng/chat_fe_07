import { useEffect, useState, useRef } from "react";
import api from "../../../common/api";
import Input from "@mui/material/Input";
import UserSlide from "../../../component/userSlide/userSlide";
import style from "./tagFriend.module.css";
export default function TagFriend({ setSelectFriends, selectFriends }) {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const originFriends = useRef();

  useEffect(() => {
    (async () => {
      const res = await api.getFriend();
      if (res && res.data) {
        setFriends(res.data);
        originFriends.current = res.data;
      }
    })();
  }, []);

  useEffect(() => {
    if (search) {
      setFriends(
        friends.filter(
          (friend) => friend.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    } else {
      setFriends(originFriends.current);
    }
  }, [search]);
  return (
    <div>
      <div className={style.inputWrap}>
        {friends && (
          <Input
            placeholder="搜尋"
            sx={{ width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        )}
      </div>
      <UserSlide
        type="friend"
        data={friends}
        onClick={(user) => {
          setSelectFriends((s) => [...new Set([...s, user])]);
        }}
      ></UserSlide>
      {selectFriends.length ? (
        <div>
          <div>已選 ({selectFriends.length})</div>
          <UserSlide
            type="friend"
            data={selectFriends}
            disableHeader
            onClick={(user) => {
              const index = selectFriends.indexOf(user);
              const copySelected = [...selectFriends];
              copySelected.splice(index, 1);
              setSelectFriends(copySelected);
            }}
          ></UserSlide>
        </div>
      ) : null}
    </div>
  );
}
