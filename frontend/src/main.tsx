import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashborad from "./pages/Dashborad";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashborad />}>
              <Route path="room" element={<div>Room</div>} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
