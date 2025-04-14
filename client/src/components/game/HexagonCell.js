import React from 'react';
import './HexagonCell.css';
import { useTheme } from '../../context/ThemeContext';

const HexagonCell = ({ letter, team, onClick, highlighted }) => {
  const { theme } = useTheme();
  
  const cellClass = `hexagon-cell ${team ? `team${team}` : ''} ${highlighted ? 'highlighted' : ''}`;
  
  return (
    <div className={cellClass} onClick={onClick}>
      <div className="hexagon-content">
        <span className="hexagon-letter">{letter}</span>
      </div>
    </div>
  );
};

export default HexagonCell;
