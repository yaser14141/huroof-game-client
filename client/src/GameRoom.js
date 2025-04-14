import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import SquareCell from './components/game/SquareCell';
import GameControls from './components/game/GameControls';
import './GameRoom.css';
import { FaUsers, FaUserCog, FaRegClock, FaArrowLeft } from 'react-icons/fa';
import { useGame } from '../context/GameContext';
import socketService from '../utils/socket';

const GameRoom = () => {
  const { theme } = useTheme();
  const { roomId } = useParams();
  const { 
    currentRoom, 
    players, 
    teams, 
    gameState, 
    cellStates, 
    currentQuestion, 
    timer,
    leaveRoom,
    assignPlayerToTeam,
    distributeTeamsRandomly,
    startGame,
    shuffleGame,
    updateTeamColors,
    announceWin
  } = useGame();
  
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(5);
  const [letters, setLetters] = useState([]);

  // محاكاة تحميل البيانات
  useEffect(() => {
    // تحميل بيانات الغرفة عند دخول الصفحة
    setLoading(false);
    
    // استخدام البيانات الحقيقية من السيرفر عبر Socket.IO
    if (cellStates && Object.keys(cellStates).length > 0) {
      const lettersArray = Object.values(cellStates).map(cell => cell.letter);
      setLetters(lettersArray);
    } else {
      generateLetters();
    }
    
    return () => {
      // عند مغادرة الصفحة، نقوم بمغادرة الغرفة
      leaveRoom();
    };
  }, [roomId]);

  // توليد حروف عشوائية للخلية
  const generateLetters = () => {
    const arabicLetters = 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي';
    const newLetters = [];
    
    for (let i = 0; i < 25; i++) {
      const randomIndex = Math.floor(Math.random() * arabicLetters.length);
      newLetters.push(arabicLetters[randomIndex]);
    }
    
    setLetters(newLetters);
  };

  // تغيير حجم الخلية
  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
  };

  // إعادة ترتيب الحروف
  const handleShuffle = () => {
    shuffleGame();
    generateLetters();
  };

  // تغيير ألوان الفرق
  const handleChangeColors = () => {
    const team1Color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    const team2Color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    
    updateTeamColors(team1Color, team2Color);
    
    // تحديث المتغيرات CSS
    document.documentElement.style.setProperty('--team1-color', team1Color);
    document.documentElement.style.setProperty('--team2-color', team2Color);
  };

  // نسخ الحروف
  const handleCopyLetters = () => {
    const lettersText = letters.join(' ');
    navigator.clipboard.writeText(lettersText);
    alert('تم نسخ الحروف بنجاح!');
  };

  // إعلان الفوز
  const handleAnnounceWinner = (teamNumber = 1) => {
    announceWin(teamNumber);
  };

  // التعامل مع النقر على خلية
  const handleCellClick = (index) => {
    if (gameState !== 'playing') return;
    
    // في التطبيق الحقيقي، هذا سيرسل طلب إلى السيرفر عبر Socket.IO
    // وسيتم تحديث حالة الخلية بناءً على رد السيرفر
    socketService.selectCell({
      roomId: currentRoom?.id,
      cellId: index,
      letter: letters[index]
    }, (response) => {
      if (response.error) {
        console.error(response.error);
      }
    });
  };

  // التحقق مما إذا كانت اللعبة قد بدأت
  const isGameStarted = gameState && gameState !== 'waiting';

  return (
    <div className="game-room-page">
      <div className="container">
        <div className="game-room-header">
          <h2>غرفة اللعب #{roomId}</h2>
          <div className="room-info">
            <div className="info-item">
              <FaUsers className="info-icon" />
              <span>{players?.length || 0} لاعبين</span>
            </div>
            <div className="info-item">
              <FaUserCog className="info-icon" />
              <span>المضيف: {currentRoom?.hostName || 'غير معروف'}</span>
            </div>
            <div className="info-item">
              <FaRegClock className="info-icon" />
              <span>{timer || 30} ثانية</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">جاري تحميل الغرفة...</p>
          </div>
        ) : (
          <>
            {!isGameStarted ? (
              <div className="card setup-card">
                <h3>إعداد اللعبة</h3>
                <div className="players-section">
                  <h4>اللاعبون ({players?.length || 0})</h4>
                  <div className="players-list">
                    {players?.map(player => (
                      <div 
                        key={player.id} 
                        className={`player-item ${player.isHost ? 'host' : ''} ${player.team ? `team${player.team}` : ''}`}
                      >
                        <div className="player-avatar">{player.username?.charAt(0)}</div>
                        <span className="player-name">{player.username}</span>
                        {player.isHost && <span className="host-badge">مضيف</span>}
                      </div>
                    )) || []}
                  </div>
                </div>

                <div className="team-selection">
                  <h4>توزيع الفرق</h4>
                  <button className="distribute-button" onClick={distributeTeamsRandomly}>
                    توزيع عشوائي
                  </button>
                  
                  <div className="teams-container">
                    <div className="team-column team1">
                      <h4>الفريق الأول</h4>
                      <div className="team-players">
                        {teams?.team1?.map(player => (
                          <div key={player.id} className="team-player">
                            <div className="player-avatar">{player.username?.charAt(0)}</div>
                            <span className="player-name">{player.username}</span>
                          </div>
                        )) || []}
                      </div>
                    </div>
                    
                    <div className="team-column team2">
                      <h4>الفريق الثاني</h4>
                      <div className="team-players">
                        {teams?.team2?.map(player => (
                          <div key={player.id} className="team-player">
                            <div className="player-avatar">{player.username?.charAt(0)}</div>
                            <span className="player-name">{player.username}</span>
                          </div>
                        )) || []}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="start-game-section">
                  <button 
                    className="start-game-button" 
                    onClick={startGame}
                    disabled={(teams?.team1?.length === 0 || teams?.team2?.length === 0) && !currentRoom?.isHost}
                  >
                    بدء اللعبة
                  </button>
                </div>
              </div>
            ) : (
              <div className="game-section">
                <div className="game-board" style={{ maxWidth: `${size * 100}px` }}>
                  <div className="square-grid" style={{ gridTemplateColumns: `repeat(5, 1fr)` }}>
                    {letters.map((letter, index) => (
                      <SquareCell 
                        key={index}
                        letter={letter}
                        team={cellStates[index]?.team}
                        onClick={() => handleCellClick(index)}
                        highlighted={currentQuestion?.cellId === index}
                      />
                    ))}
                  </div>
                </div>
                
                <GameControls 
                  onShuffle={handleShuffle}
                  onChangeColors={handleChangeColors}
                  onAnnounceWinner={handleAnnounceWinner}
                  onCopyLetters={handleCopyLetters}
                  onSizeChange={handleSizeChange}
                  size={size}
                  isHost={currentRoom?.isHost}
                />
                
                <div className="game-status">
                  <div className="question-section">
                    <h3>السؤال الحالي</h3>
                    <div className="question-card">
                      <p className="question-text">
                        {currentQuestion?.text || 'اذكر اسم حيوان يبدأ بحرف الميم'}
                      </p>
                      <div className="question-info">
                        <span className="question-letter">الحرف: {currentQuestion?.letter || 'م'}</span>
                        <span className={`question-team team${currentQuestion?.team || '1'}`}>
                          الفريق: {currentQuestion?.team ? `الفريق ${currentQuestion.team}` : 'الفريق الأول'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="teams-score">
                    <div className="team-score team1">
                      <h4>الفريق الأول</h4>
                      <div className="score-value">
                        {Object.values(cellStates || {}).filter(cell => cell.team === 1).length}
                      </div>
                    </div>
                    
                    <div className="team-score team2">
                      <h4>الفريق الثاني</h4>
                      <div className="score-value">
                        {Object.values(cellStates || {}).filter(cell => cell.team === 2).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="game-room-actions">
              <Link to="/lobby" className="back-button" onClick={leaveRoom}>
                <FaArrowLeft className="button-icon" /> العودة للوبي
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
