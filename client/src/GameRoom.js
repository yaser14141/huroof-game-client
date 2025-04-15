import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUsers, FaRandom, FaPlay, FaArrowLeft, FaComments } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GameGrid from './components/game/GameGrid';
import GameControls from './components/game/GameControls';
import { useTheme } from './context/ThemeContext';
import { useUser } from './context/UserContext';
import { useGame } from './context/GameContext';

const GameRoom = () => {
  const { theme } = useTheme();
  const { username } = useUser();
  const { currentRoom, players, teams, gameState, distributeTeamsRandomly, startGame } = useGame();
  const { roomId } = useParams();
  
  const [countdown, setCountdown] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [activeTab, setActiveTab] = useState('players');
  
  // تحقق مما إذا كان المستخدم الحالي هو المضيف
  useEffect(() => {
    if (currentRoom && username) {
      setIsHost(currentRoom.host === username);
    }
  }, [currentRoom, username]);
  
  // محاكاة العد التنازلي
  const startCountdown = () => {
    setCountdown(5);
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // محاكاة بدء اللعبة
  const handleStartGame = () => {
    startCountdown();
    
    // بدء اللعبة بعد انتهاء العد التنازلي
    setTimeout(() => {
      startGame();
    }, 5000);
  };
  
  // محاكاة قائمة اللاعبين
  const mockPlayers = [
    { id: '1', username: 'أحمد', status: 'ready', team: 1 },
    { id: '2', username: 'محمد', status: 'ready', team: 1 },
    { id: '3', username: 'سارة', status: 'ready', team: 2 },
    { id: '4', username: 'فاطمة', status: 'waiting', team: 2 },
    { id: '5', username: 'علي', status: 'spectator', team: 0 },
    { id: '6', username: username, status: 'ready', team: 1 }
  ];
  
  return (
    <PageContainer>
      <Header />
      <main className="container">
        {!gameState || gameState === 'waiting' || gameState === 'distributing' ? (
          <>
            
            <RoomSection>
              <BackLink to="/lobby">
                <FaArrowLeft />
                <span>العودة إلى اللوبي</span>
              </BackLink>
              
              <RoomHeader>
                <RoomTitle>{currentRoom?.name || 'غرفة اللعب'}</RoomTitle>
                <RoomInfo>
                  <RoomInfoItem>المضيف: {currentRoom?.host || 'ياسر'}</RoomInfoItem>
                  <RoomInfoItem>اللاعبين: {mockPlayers.length}/8</RoomInfoItem>
                  <RoomInfoItem>
                    الحالة: 
                    <RoomStatus status={gameState}>
                      {gameState === 'waiting' ? 'في الانتظار' : 
                       gameState === 'distributing' ? 'توزيع الفرق' : 
                       gameState === 'playing' ? 'قيد اللعب' : 'منتهية'}
                    </RoomStatus>
                  </RoomInfoItem>
                </RoomInfo>
              </RoomHeader>
              
              <TabsContainer>
                <Tab 
                  active={activeTab === 'players'} 
                  onClick={() => setActiveTab('players')}
                >
                  <FaUsers />
                  <span>اللاعبين</span>
                </Tab>
                <Tab 
                  active={activeTab === 'chat'} 
                  onClick={() => setActiveTab('chat')}
                >
                  <FaComments />
                  <span>الدردشة</span>
                </Tab>
              </TabsContainer>
              
              <TabContent>
                {activeTab === 'players' ? (
                  <PlayersSection>
                    <TeamContainer>
                      <TeamHeader team={1}>الفريق الأول</TeamHeader>
                      <PlayersList>
                        {mockPlayers
                          .filter(player => player.team === 1)
                          .map(player => (
                            <PlayerItem key={player.id} status={player.status}>
                              <PlayerName>{player.username}</PlayerName>
                              <PlayerStatus status={player.status}>
                                {player.status === 'ready' ? 'جاهز' : 
                                 player.status === 'waiting' ? 'ينتظر' : 'مشاهد'}
                              </PlayerStatus>
                              {isHost && player.team !== 0 && (
                                <MovePlayerButton onClick={() => console.log('نقل اللاعب', player.id)}>
                                  نقل
                                </MovePlayerButton>
                              )}
                            </PlayerItem>
                          ))}
                      </PlayersList>
                    </TeamContainer>
                    
                    <TeamContainer>
                      <TeamHeader team={2}>الفريق الثاني</TeamHeader>
                      <PlayersList>
                        {mockPlayers
                          .filter(player => player.team === 2)
                          .map(player => (
                            <PlayerItem key={player.id} status={player.status}>
                              <PlayerName>{player.username}</PlayerName>
                              <PlayerStatus status={player.status}>
                                {player.status === 'ready' ? 'جاهز' : 
                                 player.status === 'waiting' ? 'ينتظر' : 'مشاهد'}
                              </PlayerStatus>
                              {isHost && player.team !== 0 && (
                                <MovePlayerButton onClick={() => console.log('نقل اللاعب', player.id)}>
                                  نقل
                                </MovePlayerButton>
                              )}
                            </PlayerItem>
                          ))}
                      </PlayersList>
                    </TeamContainer>
                    
                    <SpectatorContainer>
                      <SpectatorHeader>المشاهدون</SpectatorHeader>
                      <PlayersList>
                        {mockPlayers
                          .filter(player => player.team === 0)
                          .map(player => (
                            <PlayerItem key={player.id} status={player.status}>
                              <PlayerName>{player.username}</PlayerName>
                              <PlayerStatus status={player.status}>
                                {player.status === 'ready' ? 'جاهز' : 
                                 player.status === 'waiting' ? 'ينتظر' : 'مشاهد'}
                              </PlayerStatus>
                              {isHost && (
                                <AssignButtons>
                                  <AssignButton team={1} onClick={() => console.log('تعيين للفريق 1', player.id)}>
                                    فريق 1
                                  </AssignButton>
                                  <AssignButton team={2} onClick={() => console.log('تعيين للفريق 2', player.id)}>
                                    فريق 2
                                  </AssignButton>
                                </AssignButtons>
                              )}
                            </PlayerItem>
                          ))}
                      </PlayersList>
                    </SpectatorContainer>
                    
                    {isHost && gameState === 'waiting' && (
                      <HostControls>
                        <ControlButton onClick={distributeTeamsRandomly}>
                          <FaRandom />
                          <span>توزيع تلقائي</span>
                        </ControlButton>
                        
                        <ControlButton primary onClick={handleStartGame}>
                          <FaPlay />
                          <span>ابدأ اللعبة</span>
                        </ControlButton>
                      </HostControls>
                    )}
                  </PlayersSection>
                ) : (
                  <ChatSection>
                    <ChatMessages>
                      <ChatMessage system>مرحباً بك في غرفة الدردشة!</ChatMessage>
                      <ChatMessage username="أحمد">السلام عليكم</ChatMessage>
                      <ChatMessage username="محمد">وعليكم السلام</ChatMessage>
                      <ChatMessage username="سارة">أهلاً بالجميع</ChatMessage>
                      <ChatMessage username={username}>مرحباً، متى نبدأ اللعبة؟</ChatMessage>
                      <ChatMessage username="أحمد">ننتظر اكتمال اللاعبين</ChatMessage>
                    </ChatMessages>
                    
                    <ChatForm>
                      <ChatInput 
                        type="text" 
                        placeholder="اكتب رسالتك هنا..." 
                      />
                      <ChatSubmit type="submit">إرسال</ChatSubmit>
                    </ChatForm>
                  </ChatSection>
                )}
              </TabContent>
            </RoomSection>
          </>
        ) : (
          <GameSection>
            <GameHeader>
              <GameTitle>{currentRoom?.name || 'غرفة اللعب'}</GameTitle>
              <GameInfo>
                <GameInfoItem>الجولة: 1</GameInfoItem>
                <GameInfoItem>الوقت: 00:30</GameInfoItem>
              </GameInfo>
            </GameHeader>
            
            <GameGrid />
            
            {isHost && (
              <GameControls />
            )}
            
            {!isHost && (
              <PlayerControls>
                <AnswerButton>
                  أنا بجاوب!
                </AnswerButton>
              </PlayerControls>
            )}
          </GameSection>
        )}
      </main>
      
      {countdown !== null && (
        <CountdownOverlay>
          <CountdownNumber>{countdown}</CountdownNumber>
        </CountdownOverlay>
      )}
      
      <Footer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const RoomSection = styled.section`
  margin: var(--spacing-xl) 0;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  transition: color var(--transition-speed);
  
  &:hover {
    color: var(--primary-color);
  }
`;

const RoomHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
`;

const RoomTitle = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

const RoomInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-weight: 500;
`;

const RoomStatus = styled.span`
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: var(--spacing-xs);
  background-color: ${props => 
    props.status === 'waiting' ? 'rgba(46, 204, 113, 0.2)' : 
    props.status === 'distributing' ? 'rgba(52, 152, 219, 0.2)' : 
    props.status === 'playing' ? 'rgba(241, 196, 15, 0.2)' : 
    'rgba(231, 76, 60, 0.2)'
  };
  color: ${props => 
    props.status === 'waiting' ? 'var(--button-success)' : 
    props.status === 'distributing' ? 'var(--primary-color)' : 
    props.status === 'playing' ? 'var(--button-warning)' : 
    'var(--button-danger)'
  };
`;

const TabsContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--card-bg)'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const TabContent = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const PlayersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const TeamHeader = styled.h3`
  color: ${props => props.team === 1 ? 'var(--team1-color)' : 'var(--team2-color)'};
  margin: 0;
  padding-bottom: var(--spacing-xs);
  border-bottom: 2px solid ${props => props.team === 1 ? 'var(--team1-color)' : 'var(--team2-color)'};
`;

const SpectatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const SpectatorHeader = styled.h3`
  color: var(--text-color);
  margin: 0;
  padding-bottom: var(--spacing-xs);
  border-bottom: 2px solid var(--border-color);
`;

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: var(--background-color);
  transition: background-color var(--transition-speed);
  
  &:hover {
    background-color: var(--border-color);
  }
`;

const PlayerName = styled.div`
  font-weight: 600;
  color: var(--text-color);
  flex: 1;
`;

const PlayerStatus = styled.div`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  background-color: ${props => 
    props.status === 'ready' ? 'rgba(46, 204, 113, 0.2)' : 
    props.status === 'waiting' ? 'rgba(241, 196, 15, 0.2)' : 
    'rgba(52, 152, 219, 0.2)'
  };
  color: ${props => 
    props.status === 'ready' ? 'var(--button-success)' : 
    props.status === 'waiting' ? 'var(--button-warning)' : 
    'var(--primary-color)'
  };
  margin-left: var(--spacing-md);
`;

const MovePlayerButton = styled.button`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: var(--button-secondary);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const AssignButtons = styled.div`
  display: flex;
  gap: var(--spacing-xs);
`;

const AssignButton = styled.button`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.team === 1 ? 'var(--team1-color)' : 'var(--team2-color)'};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all var(--transition-speed);
  
  &:hover {
    opacity: 0.9;
  }
`;

const HostControls = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center`;
  
(Content truncated due to size limit. Use line ranges to read in chunks)
