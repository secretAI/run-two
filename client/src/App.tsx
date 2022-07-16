import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Activation from './components/Activation/Activation';
import Auth from './components/Auth/Auth';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/activation" element={<Activation/>}/>
        <Route path="/getstarted" element={<Auth/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
