import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashborad from "./pages/Dashborad";
import User from "./pages/User";
import Booking from "./pages/Booking";
import Tab from "./pages/[tab]";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashborad />}>
              <Route path="bookings" element={<Booking />}>
                <Route index element={<Navigate to="all" replace />} />
                <Route path=":id" element={<Tab />} />
              </Route>

              <Route path="users" element={<User />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
