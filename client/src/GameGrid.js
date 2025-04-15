import React from 'react';
import styled from 'styled-components';
import SquareCell from './components/SquareCell';
import { useGame } from './context/GameContext';

const GameGrid = () => {
  const { cellStates, gameState } = useGame();
  
  // تحويل حالة الخلايا إلى مصفوفة ثنائية الأبعاد
  const gridSize = 5; // حجم الشبكة 5×5
  const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
  
  // ملء المصفوفة بالخلايا
  Object.entries(cellStates).forEach(([cellId, cellData]) => {
    const [row, col] = cellId.split('-').map(Number);
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      grid[row][col] = cellData;
    }
  });
  
  return (
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
                  onClick={() => console.log(`Clicked cell ${rowIndex}-${colIndex}`)}
                />
              ) : (
                <EmptyCell />
              )}
            </GridCell>
          ))}
        </GridRow>
      ))}
    </GridContainer>
  );
};

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
