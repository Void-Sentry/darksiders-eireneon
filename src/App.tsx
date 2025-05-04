"use client"

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import CallbackPage from "./routes/callback";
import LoginPage from "./routes/login";
import FeedPage from "./routes/feed";
import { useEffect } from "react";

export default function App() {
  const { sessionActive } = useProfile();
  
  useEffect(() => {
    sessionActive();
  }, []);

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/callback" element={<CallbackPage />} />
        </Routes>
    </BrowserRouter>
  )
}
