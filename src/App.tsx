import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { SignUp } from './components/SignUp/SignUp';
import { SignIn } from './components/SignIn/SignIn';
import { Home } from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
