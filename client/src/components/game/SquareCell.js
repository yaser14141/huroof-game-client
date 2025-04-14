import React from 'react';
import './SquareCell.css';
import { useTheme } from '../../context/ThemeContext';

const SquareCell = ({ letter, team, onClick, highlighted }) => {
  const { theme } = useTheme();
  
  const cellClass = `square-cell ${team ? `team${team}` : ''} ${highlighted ? 'highlighted' : ''}`;
  
  return (
    <div className={cellClass} onClick={onClick}>
      <div className="square-content">
        <span className="square-letter">{letter}</span>
      </div>
    </div>
  );
};

export default SquareCell;
