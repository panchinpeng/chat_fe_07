import {
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import Avatar from "../avatar/avatar";
import style from "./commits.module.css";
import React, { useEffect, useRef, useState } from "react";
import api from "../../common/api";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

function Commits({ id }) {
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
  return (
    <Box sx={{ mt: 1 }} className={style.commitsWrap}>
      <Box sx={{ p: 1, pb: 0 }}>
        <TextField
          label=""
          multiline
          maxRows={8}
          variant="standard"
          fullWidth
          value={commitMsg}
          onInput={(e) => setCommitMsg(e.target.value)}
          placeholder="發表留言 ..."
        />
        <Box sx={{ "& button": { mt: 0.5 }, textAlign: "right" }}>
          <Button
            variant="contained"
            color="success"
            size="small"
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
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              p: 0,
              transform: "translateX(50px)",
            }}
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
                    primary={item.username}
                    secondary={item.message}
                  ></ListItemText>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
          {nowPage < totalPage.current * 1 && (
            <Box sx={{ textAlign: "center", mt: 2 }} onClick={moreCommit}>
              加載更多
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: "center" }}>沒有任何留言</Box>
      )}
    </Box>
  );
}
export default observer(Commits);
