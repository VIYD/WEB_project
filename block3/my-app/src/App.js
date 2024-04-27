import React from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Header from './components/header/Header';

import TestPage from './pages/TestPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
