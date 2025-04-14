import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { useUser } from './context/UserContext';
import './Lobby.css';
import { FaPlus, FaArrowLeft, FaSync } from 'react-icons/fa';

const Lobby = () => {
  const { theme } = useTheme();
  const { username } = useUser();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // محاكاة تحميل الغرف
  useEffect(() => {
    setTimeout(() => {
      const dummyRooms = [
        { id: 1, name: 'غرفة ياسر', host: 'ياسر', players: 3, maxPlayers: 4, status: 'جاري التحديث...' },
        { id: 2, name: 'تحدي الحروف', host: 'أحمد', players: 2, maxPlayers: 6, status: 'جاري التحديث...' },
        { id: 3, name: 'لعبة سريعة', host: 'محمد', players: 4, maxPlayers: 4, status: 'مكتملة' },
        { id: 4, name: 'مسابقة الكلمات', host: 'سارة', players: 1, maxPlayers: 8, status: 'جاري التحديث...' },
      ];
      setRooms(dummyRooms);
      setLoading(false);
    }, 1500);
  }, []);

  // تحديث الغرف
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="lobby-page">
      <div className="container">
        <div className="lobby-header">
          <h2>الغرف المتاحة</h2>
          <div className="welcome-message">
            مرحباً بك، {username || 'زائر'}!
          </div>
        </div>

        <div className="card lobby-card">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">جاري تحميل الغرف المتاحة...</p>
            </div>
          ) : (
            <>
              <div className="rooms-header">
                <button className="refresh-button" onClick={handleRefresh}>
                  <FaSync className="button-icon" /> تحديث
                </button>
              </div>
              
              <div className="rooms-list">
                {rooms.length > 0 ? (
                  rooms.map(room => (
                    <div key={room.id} className="room-item">
                      <div className="room-info">
                        <h3 className="room-name">{room.name}</h3>
                        <div className="room-details">
                          <span className="room-host">المضيف: {room.host}</span>
                          <span className="room-players">
                            اللاعبون: {room.players}/{room.maxPlayers}
                          </span>
                          <span className={`room-status ${room.status === 'مكتملة' ? 'full' : ''}`}>
                            {room.status}
                          </span>
                        </div>
                      </div>
                      <Link 
                        to={`/room/${room.id}`} 
                        className={`join-button ${room.status === 'مكتملة' ? 'disabled' : ''}`}
                        onClick={e => room.status === 'مكتملة' && e.preventDefault()}
                      >
                        انضمام
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="no-rooms">
                    <p>لا توجد غرف متاحة حالياً</p>
                    <p>قم بإنشاء غرفة جديدة للبدء</p>
                  </div>
                )}
              </div>
            </>
          )}
          
          <div className="lobby-actions">
            <Link to="/" className="back-button">
              <FaArrowLeft className="button-icon" /> العودة للرئيسية
            </Link>
            <Link to="/create-room" className="create-room-button">
              <FaPlus className="button-icon" /> إنشاء غرفة جديدة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
