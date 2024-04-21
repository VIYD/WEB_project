import React from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import './Header.css';

const Header = () => {

    return (
        <header>
            <h1>Потрібний React &#169;&#8482;</h1>
            <a href="/settings">Налаштування</a>
            <a href="/test">Тест</a>

            
        </header>
    );
};

export default Header;