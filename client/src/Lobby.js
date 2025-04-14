import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './Lobby.css';
import { FaPlus, FaSync } from 'react-icons/fa';

const Lobby = () => {
  const { theme } = useTheme();
  const [rooms, setRooms] = useState([
    { id: 1, name: 'غرفة ياسر', players: 4, status: 'متاحة' },
    { id: 2, name: 'تحدي الحروف', players: 6, status: 'قيد اللعب' },
    { id: 3, name: 'مسابقة الكلمات', players: 2, status: 'متاحة' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="lobby-page">
      <div className="container">
        <div className="lobby-header">
          <h2>اللوبي</h2>
          <div className="header-actions">
            <Link to="/create-room" className="create-room-button">
              <FaPlus className="button-icon" /> إنشاء غرفة جديدة
            </Link>
          </div>
        </div>

        <div className="card lobby-card">
          <div className="rooms-header">
            <h3>الغرف المتاحة</h3>
            <button className="refresh-button" onClick={handleRefresh} disabled={loading}>
              <FaSync className={`button-icon ${loading ? 'spinning' : ''}`} /> تحديث
            </button>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">جاري تحميل الغرف المتاحة...</p>
            </div>
          ) : rooms.length > 0 ? (
            <div className="rooms-list">
              {rooms.map((room) => (
                <div key={room.id} className="room-item">
                  <div className="room-info">
                    <h4>{room.name}</h4>
                    <p>عدد اللاعبين: {room.players}</p>
                    <span className={`room-status ${room.status === 'متاحة' ? 'available' : 'in-game'}`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="room-actions">
                    <Link
                      to={`/room/${room.id}`}
                      className={`join-button ${room.status !== 'متاحة' ? 'disabled' : ''}`}
                      disabled={room.status !== 'متاحة'}
                    >
                      انضمام
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-rooms">
              <p>لا توجد غرف متاحة حالياً</p>
              <p>يمكنك إنشاء غرفة جديدة للبدء</p>
            </div>
          )}
        </div>

        <div className="lobby-actions">
          <Link to="/" className="back-button">العودة للصفحة الرئيسية</Link>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
