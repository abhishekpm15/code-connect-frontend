import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import UserProvider from "./context/UserProvider";
import SocketProvider from "./context/SocketProvider";
import SearchProvider from "./context/SearchProvider";
import NotificationProvider from "./context/NotificationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider>
    <UserProvider>
      <SocketProvider>
        <NotificationProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </NotificationProvider>
      </SocketProvider>
    </UserProvider>
  </ThemeProvider>
  // {/* </React.StrictMode> */}
);
