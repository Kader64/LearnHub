import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import { Layout } from "./pages/Layout";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route element={<Layout />}>
        {/* TODO all other sites */}
      </Route>
    </Routes>
  </BrowserRouter>,
);
