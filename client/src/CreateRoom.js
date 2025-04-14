import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import './CreateRoom.css';
import { FaUsers, FaClock, FaPalette, FaArrowLeft } from 'react-icons/fa';

const CreateRoom = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [timeLimit, setTimeLimit] = useState(60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      setError('يرجى إدخال اسم الغرفة');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // استخدام API لإنشاء غرفة جديدة
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: roomName,
          isPrivate,
          maxPlayers,
          timeLimit,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ أثناء إنشاء الغرفة');
      }
      
      // الانتقال إلى الغرفة الجديدة
      navigate(`/room/${data.roomId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={`create-room-container ${theme}`}>
      <div className="create-room-header">
        <Link to="/" className="back-button">
          <FaArrowLeft /> العودة
        </Link>
        <h1>إنشاء غرفة جديدة</h1>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="create-room-form">
        <div className="form-group">
          <label htmlFor="roomName">اسم الغرفة</label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="أدخل اسم الغرفة"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="isPrivate">نوع الغرفة</label>
          <div className="toggle-container">
            <button
              type="button"
              className={`toggle-button ${!isPrivate ? 'active' : ''}`}
              onClick={() => setIsPrivate(false)}
            >
              عامة
            </button>
            <button
              type="button"
              className={`toggle-button ${isPrivate ? 'active' : ''}`}
              onClick={() => setIsPrivate(true)}
            >
              خاصة
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="maxPlayers">
            <FaUsers /> الحد الأقصى للاعبين
          </label>
          <input
            type="range"
            id="maxPlayers"
            min="2"
            max="20"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
          />
          <span className="range-value">{maxPlayers}</span>
        </div>
        
        <div className="form-group">
          <label htmlFor="timeLimit">
            <FaClock /> الحد الزمني (بالدقائق)
          </label>
          <input
            type="range"
            id="timeLimit"
            min="30"
            max="120"
            step="10"
            value={timeLimit}
            onChange={(e) => setTimeLimit(parseInt(e.target.value))}
          />
          <span className="range-value">{timeLimit}</span>
        </div>
        
        <button type="submit" className="create-button" disabled={loading}>
          {loading ? 'جاري الإنشاء...' : 'إنشاء الغرفة'}
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
