import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
<<<<<<< HEAD
import { useTheme } from '../../context/ThemeContext';
=======
import { useTheme } from '../context/ThemeContext';
>>>>>>> e5ae86dcc9229676b106e618f9b95164e7ebbed3
import HexagonCell from '../components/game/HexagonCell';
import GameControls from '../components/game/GameControls';
import './GameRoom.css';
import { FaUsers, FaUserCog, FaRegClock, FaArrowLeft } from 'react-icons/fa';

const GameRoom = () => {
  const { theme } = useTheme();
  const { roomId } = useParams();
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([
    { id: 1, name: 'ياسر', isHost: true, team: null },
    { id: 2, name: 'أحمد', isHost: false, team: null },
    { id: 3, name: 'محمد', isHost: false, team: null },
    { id: 4, name: 'سارة', isHost: false, team: null },
  ]);
  const [size, setSize] = useState(5);
  const [letters, setLetters] = useState([]);
  const [teams, setTeams] = useState({
    team1: [],
    team2: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    letter: '',
    team: null,
  });
  const [timer, setTimer] = useState(30);
  const [cellStates, setCellStates] = useState({});

  // محاكاة تحميل البيانات
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      generateLetters();
    }, 1500);
  }, []);

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
    generateLetters();
  };

  // تغيير ألوان الفرق
  const handleChangeColors = () => {
    // محاكاة تغيير الألوان
    document.documentElement.style.setProperty('--team1-color', `hsl(${Math.random() * 360}, 70%, 60%)`);
    document.documentElement.style.setProperty('--team2-color', `hsl(${Math.random() * 360}, 70%, 60%)`);
  };

  // نسخ الحروف
  const handleCopyLetters = () => {
    const lettersText = letters.join(' ');
    navigator.clipboard.writeText(lettersText);
    alert('تم نسخ الحروف بنجاح!');
  };

  // إعلان الفوز
  const handleAnnounceWinner = () => {
    alert('تم إعلان الفوز للفريق الأول!');
  };

  // توزيع اللاعبين عشوائياً
  const distributePlayersRandomly = () => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const halfIndex = Math.ceil(shuffledPlayers.length / 2);
    
    const team1Players = shuffledPlayers.slice(0, halfIndex);
    const team2Players = shuffledPlayers.slice(halfIndex);
    
    const updatedPlayers = players.map(player => {
      if (team1Players.find(p => p.id === player.id)) {
        return { ...player, team: 1 };
      } else if (team2Players.find(p => p.id === player.id)) {
        return { ...player, team: 2 };
      }
      return player;
    });
    
    setPlayers(updatedPlayers);
    setTeams({
      team1: team1Players.map(p => ({ ...p, team: 1 })),
      team2: team2Players.map(p => ({ ...p, team: 2 })),
    });
  };

  // بدء اللعبة
  const startGame = () => {
    setGameStarted(true);
  };

  // التعامل مع النقر على خلية
  const handleCellClick = (index) => {
    if (!gameStarted) return;
    
    setCellStates(prev => ({
      ...prev,
      [index]: {
        team: currentQuestion.team || Math.floor(Math.random() * 2) + 1,
        letter: letters[index],
      }
    }));
  };

  return (
    <div className="game-room-page">
      <div className="container">
        <div className="game-room-header">
          <h2>غرفة اللعب #{roomId}</h2>
          <div className="room-info">
            <div className="info-item">
              <FaUsers className="info-icon" />
              <span>{players.length} لاعبين</span>
            </div>
            <div className="info-item">
              <FaUserCog className="info-icon" />
              <span>المضيف: {players.find(p => p.isHost)?.name}</span>
            </div>
            <div className="info-item">
              <FaRegClock className="info-icon" />
              <span>{timer} ثانية</span>
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
            {!gameStarted ? (
              <div className="card setup-card">
                <h3>إعداد اللعبة</h3>
                <div className="players-section">
                  <h4>اللاعبون ({players.length})</h4>
                  <div className="players-list">
                    {players.map(player => (
                      <div 
                        key={player.id} 
                        className={`player-item ${player.isHost ? 'host' : ''} ${player.team ? `team${player.team}` : ''}`}
                      >
                        <div className="player-avatar">{player.name.charAt(0)}</div>
                        <span className="player-name">{player.name}</span>
                        {player.isHost && <span className="host-badge">مضيف</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="team-selection">
                  <h4>توزيع الفرق</h4>
                  <button className="distribute-button" onClick={distributePlayersRandomly}>
                    توزيع عشوائي
                  </button>
                  
                  <div className="teams-container">
                    <div className="team-column team1">
                      <h4>الفريق الأول</h4>
                      <div className="team-players">
                        {players.filter(p => p.team === 1).map(player => (
                          <div key={player.id} className="team-player">
                            <div className="player-avatar">{player.name.charAt(0)}</div>
                            <span className="player-name">{player.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="team-column team2">
                      <h4>الفريق الثاني</h4>
                      <div className="team-players">
                        {players.filter(p => p.team === 2).map(player => (
                          <div key={player.id} className="team-player">
                            <div className="player-avatar">{player.name.charAt(0)}</div>
                            <span className="player-name">{player.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="start-game-section">
                  <button 
                    className="start-game-button" 
                    onClick={startGame}
                    disabled={teams.team1.length === 0 || teams.team2.length === 0}
                  >
                    بدء اللعبة
                  </button>
                </div>
              </div>
            ) : (
              <div className="game-section">
                <div className="game-board" style={{ maxWidth: `${size * 100}px` }}>
                  <div className="hexagon-grid" style={{ gridTemplateColumns: `repeat(5, 1fr)` }}>
                    {letters.map((letter, index) => (
                      <HexagonCell 
                        key={index}
                        letter={letter}
                        team={cellStates[index]?.team}
                        onClick={() => handleCellClick(index)}
                        highlighted={false}
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
                />
                
                <div className="game-status">
                  <div className="question-section">
                    <h3>السؤال الحالي</h3>
                    <div className="question-card">
                      <p className="question-text">
                        {currentQuestion.text || 'اذكر اسم حيوان يبدأ بحرف الميم'}
                      </p>
                      <div className="question-info">
                        <span className="question-letter">الحرف: {currentQuestion.letter || 'م'}</span>
                        <span className={`question-team team${currentQuestion.team || '1'}`}>
                          الفريق: {currentQuestion.team ? `الفريق ${currentQuestion.team}` : 'الفريق الأول'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="teams-score">
                    <div className="team-score team1">
                      <h4>الفريق الأول</h4>
                      <div className="score-value">
                        {Object.values(cellStates).filter(cell => cell.team === 1).length}
                      </div>
                    </div>
                    
                    <div className="team-score team2">
                      <h4>الفريق الثاني</h4>
                      <div className="score-value">
                        {Object.values(cellStates).filter(cell => cell.team === 2).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="game-room-actions">
              <Link to="/lobby" className="back-button">
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
