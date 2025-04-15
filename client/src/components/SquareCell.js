import React from 'react';
import styled from 'styled-components';
import { useTheme } from './context/ThemeContext';

const SquareCell = ({ letter, team, onClick, highlighted, edges }) => {
  const { theme } = useTheme();
  
  return (
    <CellContainer onClick={onClick}>
      <Cell 
        team={team} 
        highlighted={highlighted}
        theme={theme}
      >
        {/* حواف الخلية */}
        {edges && (
          <>
            <EdgeTop team={edges.top.team} connected={edges.top.connected} />
            <EdgeRight team={edges.right.team} connected={edges.right.connected} />
            <EdgeBottom team={edges.bottom.team} connected={edges.bottom.connected} />
            <EdgeLeft team={edges.left.team} connected={edges.left.connected} />
          </>
        )}
        
        {/* محتوى الخلية */}
        <CellContent>
          <Letter>{letter}</Letter>
        </CellContent>
      </Cell>
    </CellContainer>
  );
};

// تنسيق مكونات الخلية
const CellContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* نسبة 1:1 للمربع */
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

const Cell = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
    props.team === 1 ? 'var(--team1-color)' : 
    props.team === 2 ? 'var(--team2-color)' : 
    'var(--cell-bg)'
  };
  border: 2px solid ${props => 
    props.team === 1 ? 'var(--team1-color)' : 
    props.team === 2 ? 'var(--team2-color)' : 
    'var(--cell-border)'
  };
  box-shadow: ${props => 
    props.highlighted ? '0 0 15px rgba(255, 215, 0, 0.6)' : 
    props.team === 1 ? '0 0 10px rgba(231, 76, 60, 0.5)' : 
    props.team === 2 ? '0 0 10px rgba(52, 152, 219, 0.5)' : 
    'none'
  };
  transition: all 0.3s ease;
  animation: ${props => props.highlighted ? 'pulse-highlight 1.5s infinite' : 'none'};
  
  @keyframes pulse-highlight {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const CellContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
  z-index: 2;
`;

const Letter = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: var(--cell-text);
  transition: color 0.3s ease;
`;

// مكونات حواف الخلية
const Edge = styled.div`
  position: absolute;
  background-color: ${props => 
    props.team === 1 ? 'var(--team1-color)' : 
    props.team === 2 ? 'var(--team2-color)' : 
    'transparent'
  };
  display: ${props => props.connected ? 'block' : 'none'};
  transition: background-color 0.3s ease;
  z-index: 1;
`;

const EdgeTop = styled(Edge)`
  top: 0;
  left: 10%;
  width: 80%;
  height: 4px;
`;

const EdgeRight = styled(Edge)`
  top: 10%;
  right: 0;
  width: 4px;
  height: 80%;
`;

const EdgeBottom = styled(Edge)`
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 4px;
`;

const EdgeLeft = styled(Edge)`
  top: 10%;
  left: 0;
  width: 4px;
  height: 80%;
`;

export default SquareCell;
