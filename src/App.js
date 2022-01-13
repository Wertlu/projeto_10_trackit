import "./assets/css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/Login";
import SignUpPage from "./components/login/SignUp";
import HabitsPage from "./components/habits/Habits";
import TodayPage from "./components/today/Today";
import HistoryPage from "./components/history/History";
import React, { useState } from "react";
import UserContext from "./contexts/userContext";
import "./assets/css/style.css";
export default function App() {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(0);
    return (
      <UserContext.Provider value={{user, setUser, progress, setProgress}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/hoje" element={<TodayPage />} />
            <Route path="/habitos" element={<HabitsPage />} />
            <Route path="/historico" element={<HistoryPage/>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }