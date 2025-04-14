import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './HomePage';
import Lobby from './Lobby';
import CreateRoom from './CreateRoom';
import GameRoom from './GameRoom';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/create-room" element={<CreateRoom />} />
              <Route path="/room/:roomId" element={<GameRoom />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
