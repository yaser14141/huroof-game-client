import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { GameProvider } from './context/GameContext';
import HomePage from './HomePage';
import Login from './Login';
import UserSettings from './UserSettings';
import Lobby from './Lobby';
import CreateRoom from './CreateRoom';
import GameRoom from './GameRoom';

// مكون للتحقق من تسجيل الدخول
const PrivateRoute = ({ children }) => {
  // استخدام سياق المستخدم للتحقق من حالة تسجيل الدخول
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <GameProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={
                <PrivateRoute>
                  <UserSettings />
                </PrivateRoute>
              } />
              <Route path="/lobby" element={
                <PrivateRoute>
                  <Lobby />
                </PrivateRoute>
              } />
              <Route path="/create-room" element={
                <PrivateRoute>
                  <CreateRoom />
                </PrivateRoute>
              } />
              <Route path="/game-room/:roomId" element={
                <PrivateRoute>
                  <GameRoom />
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </GameProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
