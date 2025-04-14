import React, { createContext, useState, useContext, useEffect } from 'react';
import socketService from '../utils/socket';
import { roomAPI } from '../utils/api';
import { useUser } from './UserContext';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const { username, isLoggedIn } = useUser();
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({ team1: [], team2: [] });
  const [gameState, setGameState] = useState('waiting'); // waiting, distributing, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [cellStates, setCellStates] = useState({});
  const [timer, setTimer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [teamColors, setTeamColors] = useState({
    team1: '#e74c3c', // أحمر
    team2: '#3498db'  // أزرق
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // تهيئة Socket.IO عند تحميل المكون
  useEffect(() => {
    if (isLoggedIn) {
      // تهيئة اتصال Socket.IO
      const socket = socketService.initSocket();
      
      // تسجيل اللاعب
      socketService.registerPlayer({ username }, (response) => {
        if (response.error) {
          setError(response.error);
        }
      });
      
      // الاستماع لأحداث تحديث الغرف
      socket.on('rooms:update', (updatedRooms) => {
        setRooms(updatedRooms);
      });
      
      // الاستماع لأحداث تحديث الغرفة الحالية
      socket.on('room:update', (updatedRoom) => {
        if (currentRoom && updatedRoom.id === currentRoom.id) {
          setCurrentRoom(updatedRoom);
          setPlayers(updatedRoom.players);
          setTeams({
            team1: updatedRoom.teams.team1 || [],
            team2: updatedRoom.teams.team2 || []
          });
        }
      });
      
      // الاستماع لأحداث انضمام لاعب جديد
      socket.on('player:joined', (newPlayer) => {
        if (currentRoom) {
          setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
        }
      });
      
      // الاستماع لأحداث مغادرة لاعب
      socket.on('player:left', (playerId) => {
        if (currentRoom) {
          setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== playerId));
        }
      });
      
      // الاستماع لأحداث تحديث حالة اللعبة
      socket.on('game:state', (gameStateData) => {
        setGameState(gameStateData.status);
        setCellStates(gameStateData.hexGrid || {});
        
        if (gameStateData.scores) {
          // تحديث النتائج
        }
        
        if (gameStateData.status === 'finished' && gameStateData.winner) {
          setWinner(gameStateData.winner);
        }
      });
      
      // الاستماع لأحداث تحديث السؤال الحالي
      socket.on('game:question', (question) => {
        setCurrentQuestion(question);
      });
      
      // تنظيف الاستماع للأحداث عند إزالة المكون
      return () => {
        socket.off('rooms:update');
        socket.off('room:update');
        socket.off('player:joined');
        socket.off('player:left');
        socket.off('game:state');
        socket.off('game:question');
        socketService.closeSocket();
      };
    }
  }, [isLoggedIn, username, currentRoom]);

  // جلب قائمة الغرف عند تحميل المكون
  useEffect(() => {
    if (isLoggedIn) {
      fetchRooms();
    }
  }, [isLoggedIn]);

  // جلب قائمة الغرف
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // استخدام Socket.IO لجلب قائمة الغرف
      socketService.getRooms((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setRooms(response.rooms || []);
        }
        setLoading(false);
      });
    } catch (err) {
      setError('حدث خطأ أثناء جلب قائمة الغرف');
      setLoading(false);
    }
  };

  // إنشاء غرفة جديدة
  const createRoom = async (roomData) => {
    try {
      setLoading(true);
      setError(null);
      
      // استخدام Socket.IO لإنشاء غرفة جديدة
      socketService.createRoom({
        ...roomData,
        hostId: username,
        hostName: username
      }, (response) => {
        if (response.error) {
          setError(response.error);
          setLoading(false);
        } else {
          setCurrentRoom(response.room);
          setPlayers(response.players || []);
          setLoading(false);
        }
      });
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الغرفة');
      setLoading(false);
    }
  };

  // الانضمام إلى غرفة
  const joinRoom = async (roomId) => {
    try {
      setLoading(true);
      setError(null);
      
      // استخدام Socket.IO للانضمام إلى غرفة
      socketService.joinRoom({ roomId, username }, (response) => {
        if (response.error) {
          setError(response.error);
          setLoading(false);
        } else {
          setCurrentRoom(response.room);
          setPlayers(response.players || []);
          setGameState(response.gameState?.status || 'waiting');
          setCellStates(response.gameState?.hexGrid || {});
          setLoading(false);
        }
      });
    } catch (err) {
      setError('حدث خطأ أثناء الانضمام إلى الغرفة');
      setLoading(false);
    }
  };

  // مغادرة الغرفة
  const leaveRoom = async () => {
    if (!currentRoom) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // استخدام Socket.IO لمغادرة الغرفة
      socketService.leaveRoom({ roomId: currentRoom.id }, (response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setCurrentRoom(null);
          setPlayers([]);
          setTeams({ team1: [], team2: [] });
          setGameState('waiting');
          setCellStates({});
          setWinner(null);
        }
        setLoading(false);
      });
    } catch (err) {
      setError('حدث خطأ أثناء مغادرة الغرفة');
      setLoading(false);
    }
  };

  // تعيين لاعب إلى فريق
  const assignPlayerToTeam = (playerId, teamNumber) => {
    if (!currentRoom) return;
    
    const teamName = teamNumber === 1 ? 'team1' : 'team2';
    
    // إنشاء كائن التعيينات
    const assignments = {
      [playerId]: teamName
    };
    
    // استخدام Socket.IO لتعيين اللاعب إلى فريق
    socketService.assignTeams({ 
      roomId: currentRoom.id, 
      assignments 
    }, (response) => {
      if (response.error) {
        setError(response.error);
      }
    });
  };

  // توزيع اللاعبين على الفرق بشكل عشوائي
  const distributeTeamsRandomly = () => {
    if (!currentRoom) return;
    
    // استخدام Socket.IO لتوزيع اللاعبين على الفرق بشكل عشوائي
    socketService.randomTeams({ roomId: currentRoom.id }, (response) => {
      if (response.error) {
        setError(response.error);
      }
    });
  };

  // بدء اللعبة
  const startGame = () => {
    if (!currentRoom) return;
    
    // استخدام Socket.IO لبدء اللعبة
    socketService.startGame({ roomId: currentRoom.id }, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setGameState('playing');
      }
    });
  };

  // الإجابة على سؤال
  const answerQuestion = (answer, cellId) => {
    if (!currentRoom || !currentQuestion) return;
    
    // استخدام Socket.IO للإجابة على سؤال
    socketService.answerQuestion({
      roomId: currentRoom.id,
      questionId: currentQuestion.id,
      answer,
      cellId
    }, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setCurrentQuestion(null);
      }
    });
  };

  // تحديث ألوان الفرق
  const updateTeamColors = (team1Color, team2Color) => {
    if (!currentRoom) return;
    
    // استخدام Socket.IO لتحديث ألوان الفرق
    socketService.changeColors({
      roomId: currentRoom.id,
      colors: {
        team1: team1Color,
        team2: team2Color
      }
    }, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setTeamColors({
          team1: team1Color,
          team2: team2Color
        });
      }
    });
  };

  // إعادة ترتيب الحروف
  const shuffleGame = () => {
    if (!currentRoom) return;
    
    // استخدام Socket.IO لإعادة ترتيب الحروف
    socketService.shuffleGame({ roomId: currentRoom.id }, (response) => {
      if (response.error) {
        setError(response.error);
      }
    });
  };

  // إعلان الفوز
  const announceWin = (teamNumber) => {
    if (!currentRoom) return;
    
    // استخدام Socket.IO لإعلان الفوز
    socketService.announceWin({
      roomId: currentRoom.id,
      winner: teamNumber
    }, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setWinner(teamNumber);
        setGameState('finished');
      }
    });
  };

  return (
    <GameContext.Provider value={{
      rooms,
      currentRoom,
      players,
      teams,
      gameState,
      currentQuestion,
      cellStates,
      timer,
      winner,
      teamColors,
      loading,
      error,
      fetchRooms,
      createRoom,
      joinRoom,
      leaveRoom,
      assignPlayerToTeam,
      distributeTeamsRandomly,
      startGame,
      answerQuestion,
      updateTeamColors,
      shuffleGame,
      announceWin
    }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
