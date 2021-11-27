import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "light",
      primary: {
        light: "#44A4EE",
        main: "#127DCF",
      },
    },
    typography: {
      h1: {
        fontSize: "6rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "1.25rem",
        fontWeight: 700,
      },
      body1: {
        fontSize: "1rem",
      },
    },
    spacing: (spacing) => `${spacing * 0.25}rem`,
  }),
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
