import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

function App() {
  function isLoggedIn() {
    return !!localStorage.getItem("SSN");
  }

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <MainPage/> : <AuthPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
