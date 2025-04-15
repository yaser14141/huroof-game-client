import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaRedo, FaStopwatch, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useGame } from '../context/GameContext';

const HostControls = () => {
  const { gameState, startGame, pauseGame, resumeGame, resetGame } = useGame();
  
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [roundNumber, setRoundNumber] = useState(1);
  
  // تحديث حالة المؤقت عند تغيير حالة اللعبة
  useEffect(() => {
    if (gameState === 'playing') {
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
    }
  }, [gameState]);
  
  // تشغيل المؤقت
  useEffect(() => {
    let interval;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // انتهاء الوقت
      handleTimeUp();
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);
  
  // معالجة انتهاء الوقت
  const handleTimeUp = () => {
    // يمكن هنا تنفيذ الإجراءات المطلوبة عند انتهاء الوقت
    // مثل تغيير دور اللاعب أو الفريق
    setIsTimerRunning(false);
    
    // تشغيل صوت انتهاء الوقت إذا كان الصوت مفعلاً
    if (isSoundEnabled) {
      playTimeUpSound();
    }
  };
  
  // تشغيل صوت انتهاء الوقت
  const playTimeUpSound = () => {
    // يمكن هنا تنفيذ تشغيل الصوت
    console.log('تشغيل صوت انتهاء الوقت');
  };
  
  // إعادة ضبط المؤقت
  const resetTimer = (seconds = 30) => {
    setTimer(seconds);
    setIsTimerRunning(false);
  };
  
  // تغيير مدة المؤقت
  const changeTimerDuration = (seconds) => {
    resetTimer(seconds);
  };
  
  // تبديل حالة الصوت
  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };
  
  // بدء جولة جديدة
  const startNewRound = () => {
    setRoundNumber(prevRound => prevRound + 1);
    resetTimer();
    // يمكن هنا تنفيذ الإجراءات الأخرى المطلوبة لبدء جولة جديدة
  };
  
  // تنسيق الوقت بصيغة MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <ControlsContainer>
      <ControlsHeader>
        <ControlsTitle>لوحة تحكم المضيف</ControlsTitle>
        <RoundInfo>الجولة: {roundNumber}</RoundInfo>
      </ControlsHeader>
      
      <ControlsSection>
        <SectionTitle>التحكم باللعبة</SectionTitle>
        <ButtonsGroup>
          {gameState === 'waiting' && (
            <ControlButton primary onClick={startGame}>
              <FaPlay />
              <span>بدء اللعبة</span>
            </ControlButton>
          )}
          
          {gameState === 'playing' && (
            <ControlButton warning onClick={pauseGame}>
              <FaPause />
              <span>إيقاف مؤقت</span>
            </ControlButton>
          )}
          
          {gameState === 'paused' && (
            <ControlButton primary onClick={resumeGame}>
              <FaPlay />
              <span>استئناف</span>
            </ControlButton>
          )}
          
          <ControlButton danger onClick={resetGame}>
            <FaRedo />
            <span>إعادة ضبط</span>
          </ControlButton>
        </ButtonsGroup>
      </ControlsSection>
      
      <ControlsSection>
        <SectionTitle>المؤقت</SectionTitle>
        <TimerDisplay isRunning={isTimerRunning} isLow={timer < 10}>
          <FaStopwatch />
          <TimerText>{formatTime(timer)}</TimerText>
        </TimerDisplay>
        
        <TimerControls>
          <TimerButton onClick={() => changeTimerDuration(15)}>15 ثانية</TimerButton>
          <TimerButton onClick={() => changeTimerDuration(30)}>30 ثانية</TimerButton>
          <TimerButton onClick={() => changeTimerDuration(45)}>45 ثانية</TimerButton>
          <TimerButton onClick={() => changeTimerDuration(60)}>60 ثانية</TimerButton>
        </TimerControls>
        
        <ButtonsGroup>
          {!isTimerRunning ? (
            <ControlButton primary onClick={() => setIsTimerRunning(true)}>
              <FaPlay />
              <span>تشغيل المؤقت</span>
            </ControlButton>
          ) : (
            <ControlButton warning onClick={() => setIsTimerRunning(false)}>
              <FaPause />
              <span>إيقاف المؤقت</span>
            </ControlButton>
          )}
          
          <ControlButton onClick={() => resetTimer()}>
            <FaRedo />
            <span>إعادة ضبط المؤقت</span>
          </ControlButton>
        </ButtonsGroup>
      </ControlsSection>
      
      <ControlsFooter>
        <SoundToggle onClick={toggleSound}>
          {isSoundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          <span>{isSoundEnabled ? 'الصوت: مفعل' : 'الصوت: معطل'}</span>
        </SoundToggle>
        
        <NewRoundButton onClick={startNewRound}>
          جولة جديدة
        </NewRoundButton>
      </ControlsFooter>
    </ControlsContainer>
  );
};

const ControlsContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const ControlsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

const ControlsTitle = styled.h3`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.2rem;
`;

const RoundInfo = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: 0.9rem;
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const SectionTitle = styled.h4`
  color: var(--text-color);
  margin: 0;
  font-size: 1rem;
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid var(--border-color);
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: ${props => 
    props.primary ? 'var(--button-primary)' : 
    props.warning ? 'var(--button-warning)' : 
    props.danger ? 'var(--button-danger)' : 
    'var(--background-color)'
  };
  color: ${props => 
    props.primary || props.warning || props.danger ? 'white' : 'var(--text-color)'
  };
  border: none;
  cursor: pointer;
  font-weight: 600;
  flex: 1;
  transition: all var(--transition-speed);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--background-color);
  border-radius: var(--border-radius-md);
  color: ${props => props.isLow ? 'var(--button-danger)' : 'var(--text-color)'};
  font-weight: 700;
  font-size: 1.5rem;
  animation: ${props => props.isRunning && props.isLow ? 'pulse 1s infinite' : 'none'};
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const TimerText = styled.span`
  font-family: monospace;
`;

const TimerControls = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
`;

const TimerButton = styled.button`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--border-color);
  }
`;

const ControlsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
`;

const SoundToggle = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: background-color var(--transition-speed);
  
  &:hover {
    background-color: var(--background-color);
  }
  
  svg {
    color: var(--primary-color);
  }
`;

const NewRoundButton = styled.button`
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: var(--button-success);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-speed);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
`;

export default HostControls;
