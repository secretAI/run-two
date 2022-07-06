import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="auth" element={<AuthPage/>}/>
        <Route path="/board" element={<MainPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
