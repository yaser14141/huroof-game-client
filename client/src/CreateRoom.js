import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import './CreateRoom.css';
import { FaUsers, FaClock, FaPalette, FaArrowLeft } from 'react-icons/fa';

const CreateRoom = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [roomName, setRoomName] = useState('');
  const [playerCount, setPlayerCount] = useState(4);
  const [timeLimit, setTimeLimit] = useState(30);
  const [penaltyTime, setPenaltyTime] = useState(10);
  const [roomType, setRoomType] = useState('public');
  const [team1Color, setTeam1Color] = useState('#e74c3c');
  const [team2Color, setTeam2Color] = useState('#3498db');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // محاكاة إنشاء غرفة
    const roomId = Math.floor(Math.random() * 1000);
    navigate(`/room/${roomId}`);
  };
  
  return (
    <div className="create-room-page">
      <div className="container">
        <div className="create-room-header">
          <h2>إنشاء غرفة جديدة</h2>
        </div>
        
        <div className="card create-room-card">
          <form onSubmit={handleSubmit}>
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
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="playerCount">
                  <FaUsers className="form-icon" /> عدد اللاعبين
                </label>
                <select
                  id="playerCount"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                >
                  <option value="2">2 لاعبين</option>
                  <option value="4">4 لاعبين</option>
                  <option value="6">6 لاعبين</option>
                  <option value="8">8 لاعبين</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="timeLimit">
                  <FaClock className="form-icon" /> مدة الإجابة (ثانية)
                </label>
                <select
                  id="timeLimit"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                >
                  <option value="15">15 ثانية</option>
                  <option value="30">30 ثانية</option>
                  <option value="45">45 ثانية</option>
                  <option value="60">60 ثانية</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="penaltyTime">مدة العقوبة (ثانية)</label>
                <select
                  id="penaltyTime"
                  value={penaltyTime}
                  onChange={(e) => setPenaltyTime(parseInt(e.target.value))}
                >
                  <option value="5">5 ثواني</option>
                  <option value="10">10 ثواني</option>
                  <option value="15">15 ثانية</option>
                  <option value="20">20 ثانية</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="roomType">نوع الغرفة</label>
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="public">عامة</option>
                  <option value="private">خاصة</option>
                  <option value="code">بكود</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>
                <FaPalette className="form-icon" /> ألوان الفرق
              </label>
              <div className="team-colors">
                <div className="color-picker">
                  <span className="color-label">الفريق الأول</span>
                  <input
                    type="color"
                    value={team1Color}
                    onChange={(e) => setTeam1Color(e.target.value)}
                    className="color-input"
                  />
                  <span className="color-value">{team1Color}</span>
                </div>
                
                <div className="color-picker">
                  <span className="color-label">الفريق الثاني</span>
                  <input
                    type="color"
                    value={team2Color}
                    onChange={(e) => setTeam2Color(e.target.value)}
                    className="color-input"
                  />
                  <span className="color-value">{team2Color}</span>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <Link to="/lobby" className="back-button">
                <FaArrowLeft className="button-icon" /> العودة
              </Link>
              <button type="submit" className="create-room-button">إنشاء الغرفة</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
