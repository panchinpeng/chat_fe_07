import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MantineProvider, createTheme as createMantineTheme } from "@mantine/core";
import Loading from "./component/loading/loading";
import Alert from "./component/alert/alert";
import Zooming from "./component/zoomImg/zoomImg";

const theme = createTheme({
  palette: {
    primary: { main: "#7c5cff", dark: "#4c3ab8" },
    secondary: { main: "#f0a85b" },
    text: { primary: "#1f2937", secondary: "#667085" },
    background: { default: "#fffdfb", paper: "rgba(255,255,255,0.9)" },
  },
  typography: {
    fontFamily:
      'Inter, "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "8px 18px",
          boxShadow: "0 10px 24px rgba(124, 92, 255, 0.16)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: "rgba(255, 255, 255, 0.86)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

const mantineTheme = createMantineTheme({
  primaryColor: "violet",
  defaultRadius: "md",
  fontFamily:
    'Inter, "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
  headings: {
    fontFamily:
      'Inter, "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
    fontWeight: "800",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
// 解決當觀看commits時，點選頭貼僅入其他頁，按上一頁後，會出現錯誤Uncaught ResizeObserver loop completed with undelivered notifications.
const ro = window.ResizeObserver;
window.ResizeObserver = class extends ro {
  constructor(callback) {
    super((entries, observer) => {
      requestAnimationFrame(() => callback(entries, observer));
    });
  }
};

root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <Suspense fallback={<Loading from="Suspense"></Loading>}>
        <RouterProvider
          router={router}
          future={{ v7_startTransition: true }}
        ></RouterProvider>
        <Alert />
        <Loading />
        <Zooming />
      </Suspense>
    </MantineProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
