import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
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

  // Room management functions
  const createRoom = (roomData) => {
    const newRoom = {
      id: Date.now().toString(),
      ...roomData,
      createdAt: new Date().toISOString(),
      players: [],
      status: 'waiting'
    };
    setRooms(prevRooms => [...prevRooms, newRoom]);
    setCurrentRoom(newRoom);
    return newRoom;
  };

  const joinRoom = (roomId, player) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, players: [...room.players, player] } 
          : room
      )
    );
    
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
      setPlayers(room.players);
    }
  };

  const leaveRoom = (roomId, playerId) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, players: room.players.filter(p => p.id !== playerId) } 
          : room
      )
    );
    
    if (currentRoom && currentRoom.id === roomId) {
      setCurrentRoom(null);
      setPlayers([]);
    }
  };

  // Team management functions
  const assignPlayerToTeam = (playerId, teamNumber) => {
    if (teamNumber === 1) {
      setTeams(prev => ({
        ...prev,
        team1: [...prev.team1, playerId],
        team2: prev.team2.filter(id => id !== playerId)
      }));
    } else if (teamNumber === 2) {
      setTeams(prev => ({
        ...prev,
        team2: [...prev.team2, playerId],
        team1: prev.team1.filter(id => id !== playerId)
      }));
    }
  };

  const distributeTeamsRandomly = () => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const halfIndex = Math.ceil(shuffledPlayers.length / 2);
    
    const team1Players = shuffledPlayers.slice(0, halfIndex).map(p => p.id);
    const team2Players = shuffledPlayers.slice(halfIndex).map(p => p.id);
    
    setTeams({
      team1: team1Players,
      team2: team2Players
    });
  };

  // Game state management
  const startGame = () => {
    setGameState('playing');
    // Initialize game board, timer, etc.
    initializeGameBoard();
  };

  const initializeGameBoard = () => {
    // Create initial cell states for a grid of square cells
    const initialCellStates = {};
    // Example: 5x5 grid
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cellId = `${row}-${col}`;
        initialCellStates[cellId] = {
          id: cellId,
          letter: getRandomArabicLetter(),
          team: 0, // 0: neutral, 1: team1, 2: team2
          captured: false,
          capturedBy: null,
          capturedAt: null,
          // إضافة معلومات الحواف للخلايا المربعة
          edges: {
            top: { connected: row > 0, team: 0 },
            right: { connected: col < 4, team: 0 },
            bottom: { connected: row < 4, team: 0 },
            left: { connected: col > 0, team: 0 }
          }
        };
      }
    }
    setCellStates(initialCellStates);
  };

  const getRandomArabicLetter = () => {
    const arabicLetters = 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي';
    return arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
  };

  const captureCell = (cellId, teamNumber, playerId) => {
    setCellStates(prev => ({
      ...prev,
      [cellId]: {
        ...prev[cellId],
        team: teamNumber,
        captured: true,
        capturedBy: playerId,
        capturedAt: new Date().toISOString()
      }
    }));
    
    // تحديث حواف الخلايا المجاورة
    updateAdjacentEdges(cellId, teamNumber);
    
    // Check for win condition
    checkWinCondition();
  };

  const updateAdjacentEdges = (cellId, teamNumber) => {
    const [row, col] = cellId.split('-').map(Number);
    
    // تحديث الحواف للخلايا المجاورة
    const adjacentCells = {
      top: row > 0 ? `${row-1}-${col}` : null,
      right: col < 4 ? `${row}-${col+1}` : null,
      bottom: row < 4 ? `${row+1}-${col}` : null,
      left: col > 0 ? `${row}-${col-1}` : null
    };
    
    setCellStates(prev => {
      const newState = { ...prev };
      
      // تحديث الحواف للخلية الحالية والخلايا المجاورة
      if (adjacentCells.top) {
        newState[cellId].edges.top.team = teamNumber;
        newState[adjacentCells.top].edges.bottom.team = teamNumber;
      }
      
      if (adjacentCells.right) {
        newState[cellId].edges.right.team = teamNumber;
        newState[adjacentCells.right].edges.left.team = teamNumber;
      }
      
      if (adjacentCells.bottom) {
        newState[cellId].edges.bottom.team = teamNumber;
        newState[adjacentCells.bottom].edges.top.team = teamNumber;
      }
      
      if (adjacentCells.left) {
        newState[cellId].edges.left.team = teamNumber;
        newState[adjacentCells.left].edges.right.team = teamNumber;
      }
      
      return newState;
    });
  };

  const checkWinCondition = () => {
    // تنفيذ منطق التحقق من الفوز
    // على سبيل المثال، التحقق مما إذا كان الفريق قد أكمل مسارًا من جانب إلى الجانب المقابل
    
    // منطق مؤقت للتوضيح
    const team1Cells = Object.values(cellStates).filter(cell => cell.team === 1);
    const team2Cells = Object.values(cellStates).filter(cell => cell.team === 2);
    
    if (team1Cells.length >= 13) { // أكثر من نصف الخلايا
      setWinner(1);
      setGameState('finished');
    } else if (team2Cells.length >= 13) {
      setWinner(2);
      setGameState('finished');
    }
  };

  // Question management
  const setQuestion = (question) => {
    setCurrentQuestion(question);
  };

  const answerQuestion = (isCorrect, teamNumber, playerId, cellId) => {
    if (isCorrect) {
      captureCell(cellId, teamNumber, playerId);
    }
    setCurrentQuestion(null);
  };

  // تحديث ألوان الفرق
  const updateTeamColors = (team1Color, team2Color) => {
    setTeamColors({
      team1: team1Color,
      team2: team2Color
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
      createRoom,
      joinRoom,
      leaveRoom,
      assignPlayerToTeam,
      distributeTeamsRandomly,
      startGame,
      setQuestion,
      answerQuestion,
      updateTeamColors
    }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
