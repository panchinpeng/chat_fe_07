import {
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  TextField,
  Button,
} from "@mui/material";
import Avatar from "../avatar/avatar";
import style from "./commits.module.css";
import React, { useEffect, useRef, useState } from "react";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

function Commits({ id, renderFn }) {
  const store = useStore();
  const [history, setHistory] = useState([]);
  const [commitMsg, setCommitMsg] = useState("");
  const totalPage = useRef();
  const lastId = useRef();
  const [nowPage, setNowPage] = useState(1);
  const moreCommit = async () => {
    setNowPage((nowPage) => nowPage + 1);
    const res = await api.getCommits(id, lastId.current);
    if (res && res.status) {
      setHistory((history) => [...history, ...res.data.res]);
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const commitsData = await api.getCommits(id);
        if (commitsData && commitsData.status) {
          totalPage.current = commitsData.data.totalPage;
          lastId.current = commitsData.data.last;
          setHistory(commitsData.data.res);
        }
      }
    })();
  }, [id]);

  const handleSubmit = async () => {
    if (commitMsg) {
      const res = await api.setCommits(id, commitMsg);
      if (res) {
        setHistory((history) => [
          { username: store.user.account.username, message: commitMsg },
          ...history,
        ]);
        setCommitMsg("");
      }
    }
  };

  useEffect(() => {
    renderFn && renderFn();
  }, [history]);
  return (
    <Box className={style.commitsWrap}>
      <Box className={style.editor}>
        <TextField
          label=""
          multiline
          maxRows={8}
          minRows={2}
          variant="outlined"
          fullWidth
          value={commitMsg}
          onInput={(e) => setCommitMsg(e.target.value)}
          placeholder="發表留言 ..."
          className={style.input}
        />
        <Box className={style.actions}>
          <Button
            variant="contained"
            size="small"
            disableElevation
            className={style.submit}
            onClick={handleSubmit}
          >
            送出
          </Button>
        </Box>
      </Box>
      <div className={style.title}>所有留言</div>
      {history.length ? (
        <>
          <List
            className={style.list}
          >
            {history.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 0,
                    animationDelay: `${index < 20 ? 0.1 * index : 0}s !important;`,
                  }}
                  className={style.commit}
                >
                  <ListItemAvatar
                    sx={{ flex: "0 0 36px", minWidth: 0, mt: "6px" }}
                  >
                    <Avatar from="Message" friendName={item.username} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ whiteSpace: "pre-wrap", my: "3px" }}
                    className={style.commitText}
                    primary={item.username}
                    secondary={item.message}
                  ></ListItemText>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
          {nowPage < totalPage.current * 1 && (
            <Box className={style.more} onClick={moreCommit}>
              加載更多
            </Box>
          )}
        </>
      ) : (
        <Box className={style.empty}>還沒有留言，來當第一個回覆的人</Box>
      )}
    </Box>
  );
}
export default observer(Commits);
