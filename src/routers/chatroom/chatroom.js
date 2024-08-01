import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import style from "./chatroom.module.css";
import { useNavigate } from "react-router-dom";
export default function Chatroom() {
  const navigator = useNavigate();
  return (
    <Box className={style.content}>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          color: "#8d8888",
        }}
      >
        哭哭，沒有好朋友
      </Box> */}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem
          alignItems="flex-start"
          onClick={() => navigator("/member/online")}
        >
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://picsum.photos/id/237/200/300"
            />
          </ListItemAvatar>
          <ListItemText
            primary="姓名"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容訊息內容
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
      </List>
    </Box>
  );
}
