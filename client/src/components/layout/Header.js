import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const { username, isLoggedIn, logout } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>حروف مع ياسر</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label={theme === 'light' ? 'تفعيل الوضع المظلم' : 'تفعيل الوضع المضيء'}
            title={theme === 'light' ? 'تفعيل الوضع المظلم' : 'تفعيل الوضع المضيء'}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          
          {isLoggedIn ? (
            <>
              <Link to="/lobby" className="nav-link">Lobby</Link>
              <div className="user-info">
                <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
                <span className="username">{username}</span>
                <button className="logout-button" onClick={logout}>تسجيل الخروج</button>
              </div>
            </>
          ) : (
            <Link to="/" className="nav-link">تسجيل الدخول</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
