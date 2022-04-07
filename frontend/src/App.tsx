import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { RootState } from '.';
import './App.scss';
import LoginPage from './containers/Pages/LoginPage/LoginPage';
import MainPage from './containers/Pages/MainPage/MainPage';
import TopicsModal from './containers/TopicsModal/TopicsModal';


function App() {

  const mode = useSelector((state: RootState) => state.global.mode);
  const login = useSelector((state: RootState) => state.global.login)

  return (
    <div className="container">
      <AnimatePresence>
        {
          mode === "login"
            ? <LoginPage />
            : <MainPage />
        }
      </AnimatePresence>
      <TopicsModal />
    </div>
  );
}

export default App;
