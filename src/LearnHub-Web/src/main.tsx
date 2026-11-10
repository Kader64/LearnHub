import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AppLayout from "./layout/AppLayout";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {/* TODO Code verification */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/test" element={<AppLayout />}>
          
        
        </Route>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);