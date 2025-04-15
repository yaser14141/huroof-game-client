import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaRedo, FaCheck, FaTimes } from 'react-icons/fa';
import { useGame } from './context/GameContext';

const GameControls = () => {
  const { gameState, teamColors } = useGame();
  
  return (
    <ControlsContainer>
      <ControlsSection>
        <ControlTitle>أدوات التحكم</ControlTitle>
        <ButtonGroup>
          <ControlButton title="إعادة ترتيب الحروف">
            <FaRedo />
            <span>إعادة ترتيب</span>
          </ControlButton>
          
          <ControlButton title="بدء اللعبة" primary>
            <FaPlay />
            <span>بدء اللعبة</span>
          </ControlButton>
        </ButtonGroup>
      </ControlsSection>
      
      <ControlsSection>
        <ControlTitle>التحكم بالأسئلة</ControlTitle>
        <QuestionControls>
          <QuestionInput placeholder="السؤال..." />
          <QuestionInput placeholder="التلميح..." />
          <QuestionInput placeholder="الجواب..." />
          
          <ButtonGroup>
            <ControlButton title="إجابة صحيحة" success>
              <FaCheck />
              <span>صحيح</span>
            </ControlButton>
            
            <ControlButton title="إجابة خاطئة" danger>
              <FaTimes />
              <span>خطأ</span>
            </ControlButton>
          </ButtonGroup>
        </QuestionControls>
      </ControlsSection>
      
      <ControlsSection>
        <ControlTitle>ألوان الفرق</ControlTitle>
        <TeamColorControls>
          <TeamColorItem>
            <TeamColorLabel>الفريق الأول</TeamColorLabel>
            <TeamColorPicker 
              type="color" 
              value={teamColors.team1} 
              onChange={(e) => console.log('Team 1 color changed:', e.target.value)} 
            />
          </TeamColorItem>
          
          <TeamColorItem>
            <TeamColorLabel>الفريق الثاني</TeamColorLabel>
            <TeamColorPicker 
              type="color" 
              value={teamColors.team2} 
              onChange={(e) => console.log('Team 2 color changed:', e.target.value)} 
            />
          </TeamColorItem>
        </TeamColorControls>
      </ControlsSection>
    </ControlsContainer>
  );
};

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
  max-width: 600px;
  margin: var(--spacing-md) auto;
  padding: var(--spacing-md);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const ControlTitle = styled.h3`
  color: var(--text-color);
  font-size: 1rem;
  margin: 0;
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid var(--border-color);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed);
  background-color: ${props => 
    props.primary ? 'var(--button-primary)' : 
    props.success ? 'var(--button-success)' : 
    props.danger ? 'var(--button-danger)' : 
    'var(--button-secondary)'
  };
  color: var(--button-text);
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const QuestionControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const QuestionInput = styled.input`
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  transition: border-color var(--transition-speed), background-color var(--transition-speed);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TeamColorControls = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
`;

const TeamColorItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const TeamColorLabel = styled.label`
  color: var(--text-color);
  font-weight: 600;
`;

const TeamColorPicker = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: var(--border-radius-sm);
  }
`;

export default GameControls;
