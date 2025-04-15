import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SquareCell from './SquareCell';
import { useGame } from './context/GameContext';
import { useTheme } from './context/ThemeContext';

const GameBoard = () => {
  const { cellStates, gameState, currentQuestion, teamColors } = useGame();
  const { theme } = useTheme();
  
  const [selectedCell, setSelectedCell] = useState(null);
  const [gridSize, setGridSize] = useState(5); // حجم الشبكة الافتراضي 5×5
  
  // تحويل حالة الخلايا إلى مصفوفة ثنائية الأبعاد
  const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
  
  // ملء المصفوفة بالخلايا
  Object.entries(cellStates).forEach(([cellId, cellData]) => {
    const [row, col] = cellId.split('-').map(Number);
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      grid[row][col] = cellData;
    }
  });
  
  // معالجة النقر على خلية
  const handleCellClick = (cellId) => {
    if (gameState !== 'playing') return;
    
    setSelectedCell(cellId);
    
    // إذا كان هناك سؤال حالي، يمكن للمضيف تحديد الخلية للإجابة
    if (currentQuestion) {
      // يمكن هنا إضافة منطق إضافي للتحقق من صحة اختيار الخلية
      console.log(`تم اختيار الخلية ${cellId} للسؤال الحالي`);
    }
  };
  
  // تحديث حجم الشبكة بناءً على عدد الخلايا
  useEffect(() => {
    if (Object.keys(cellStates).length > 0) {
      // تحديد أقصى قيمة للصف والعمود
      let maxRow = 0;
      let maxCol = 0;
      
      Object.keys(cellStates).forEach(cellId => {
        const [row, col] = cellId.split('-').map(Number);
        maxRow = Math.max(maxRow, row);
        maxCol = Math.max(maxCol, col);
      });
      
      // تحديد حجم الشبكة بناءً على أقصى قيمة + 1
      const newSize = Math.max(maxRow, maxCol) + 1;
      setGridSize(newSize);
    }
  }, [cellStates]);
  
  return (
    <BoardContainer>
      <BoardGrid size={gridSize}>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const cellId = `${rowIndex}-${colIndex}`;
            
            // إذا كانت الخلية غير موجودة، عرض خلية فارغة
            if (!cell) {
              return (
                <EmptyCell key={cellId} />
              );
            }
            
            // تحديد ما إذا كانت الخلية محددة
            const isSelected = selectedCell === cellId;
            
            // تحديد ما إذا كانت الخلية مرتبطة بالسؤال الحالي
            const isHighlighted = currentQuestion && currentQuestion.letter === cell.letter;
            
            return (
              <CellWrapper key={cellId} onClick={() => handleCellClick(cellId)}>
                <SquareCell
                  letter={cell.letter}
                  team={cell.team}
                  highlighted={isHighlighted || isSelected}
                  edges={cell.edges}
                />
              </CellWrapper>
            );
          })
        ))}
      </BoardGrid>
      
      <TeamScores>
        <TeamScore team={1} color={teamColors.team1}>
          <TeamName>الفريق الأول</TeamName>
          <ScoreValue>{countTeamCells(1)}</ScoreValue>
        </TeamScore>
        
        <TeamScore team={2} color={teamColors.team2}>
          <TeamName>الفريق الثاني</TeamName>
          <ScoreValue>{countTeamCells(2)}</ScoreValue>
        </TeamScore>
      </TeamScores>
    </BoardContainer>
  );
  
  // حساب عدد الخلايا لكل فريق
  function countTeamCells(teamNumber) {
    return Object.values(cellStates).filter(cell => cell.team === teamNumber).length;
  }
};

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.size}, 1fr)`};
  grid-template-rows: ${props => `repeat(${props.size}, 1fr)`};
  gap: 4px;
  width: 100%;
  aspect-ratio: 1;
  background-color: var(--border-color);
  padding: 4px;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

const CellWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
    z-index: 10;
  }
`;

const EmptyCell = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  opacity: 0.3;
  border-radius: var(--border-radius-sm);
`;

const TeamScores = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
`;

const TeamScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: ${props => props.color || 'var(--card-bg)'};
  color: white;
  min-width: 120px;
  box-shadow: var(--shadow-sm);
`;

const TeamName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const ScoreValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

export default GameBoard;
