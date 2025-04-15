import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SquareCell from './components/SquareCell';
import { useGame } from './context/GameContext';
import { useSocket } from './context/SocketContext';

const GameGrid = () => {
  const { cellStates, setCellStates, gameState, roomId } = useGame();
  const socket = useSocket();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [answerTime, setAnswerTime] = useState(10);

  const gridSize = 5;
  const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));

  Object.entries(cellStates).forEach(([cellId, cellData]) => {
    const [row, col] = cellId.split('-').map(Number);
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      grid[row][col] = cellData;
    }
  });

  const handleCellClick = (rowIndex, colIndex) => {
    if (selectedTeam !== null && roomId) {
      const cellKey = `${rowIndex}-${colIndex}`;
      socket.emit('cell:update', {
        roomId,
        cellId: cellKey,
        team: selectedTeam
      });
    }
  };

  const handleAnswerTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 30) {
      setAnswerTime(value);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('cell:updated', ({ cellId, team }) => {
      setCellStates(prev => ({
        ...prev,
        [cellId]: {
          ...prev[cellId],
          team
        }
      }));
    });
    return () => {
      socket.off('cell:updated');
    };
  }, [socket, setCellStates]);

  return (
    <>
      <ControlsPanel>
        <TeamButtons>
          <button onClick={() => setSelectedTeam(1)}>🎨 فريق 1</button>
          <button onClick={() => setSelectedTeam(2)}>🎨 فريق 2</button>
        </TeamButtons>
        <TimeControl>
          <label>⏱ وقت الإجابة (بالثواني):</label>
          <input 
            type="number" 
            value={answerTime} 
            onChange={handleAnswerTimeChange} 
            min="1" 
            max="30"
          />
        </TimeControl>
      </ControlsPanel>

      <GridContainer>
        {grid.map((row, rowIndex) => (
          <GridRow key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => (
              <GridCell key={`cell-${rowIndex}-${colIndex}`}>
                {cell ? (
                  <SquareCell
                    letter={cell.letter}
                    team={cell.team}
                    highlighted={cell.highlighted}
                    edges={cell.edges}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  />
                ) : (
                  <EmptyCell />
                )}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridContainer>
    </>
  );
};

const ControlsPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TeamButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const TimeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  input {
    width: 60px;
    padding: 4px;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--spacing-md);
`;

const GridRow = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
`;

const GridCell = styled.div`
  flex: 1;
  aspect-ratio: 1;
`;

const EmptyCell = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--border-color);
  opacity: 0.3;
  border-radius: var(--border-radius-sm);
`;

export default GameGrid;
