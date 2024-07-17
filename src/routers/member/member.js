import { Box, Slide } from "@mui/material";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { Tooltip } from "@mui/material";
import style from "./member.module.css";
import { useState } from "react";
import AddFriend from "../../component/addFriend/addFriend";

export default function Member() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  return (
    <Box className={style.box}>
      <div className={style.addFriend}>
        <Tooltip
          title="add friend"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -10],
                  },
                },
              ],
            },
          }}
        >
          <MapsUgcIcon
            color="primary"
            fontSize="large"
            onClick={() => setShowAddFriend(true)}
          ></MapsUgcIcon>
        </Tooltip>
      </div>

      <AddFriend open={showAddFriend} setOpen={setShowAddFriend}></AddFriend>
    </Box>
  );
}
