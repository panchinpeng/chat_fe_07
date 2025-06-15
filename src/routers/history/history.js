import { useState, lazy } from "react";
import { Box, AppBar, Tabs, Tab, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import style from "./history.module.css";

const PostHistory = lazy(() => import("./postHistory/postHistory"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function History() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="動態"
            id={`full-width-tab-1`}
            aria-controls={`full-width-tabpanel-1`}
          />
          <Tab
            label="互動"
            id={`full-width-tab-2`}
            aria-controls={`full-width-tabpanel-2`}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <PostHistory></PostHistory>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
    </Box>
  );
}
