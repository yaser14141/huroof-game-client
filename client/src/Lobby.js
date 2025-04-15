import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlus, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RandomDua from '../components/layout/RandomDua';
import { useTheme } from '../context/ThemeContext';

const Lobby = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('public');
  const [roomCode, setRoomCode] = useState('');
  
  // بيانات وهمية للغرف العامة
  const publicRooms = [
    { id: '1', name: 'غرفة المرح', host: 'أحمد', players: 3, maxPlayers: 6, status: 'waiting' },
    { id: '2', name: 'تحدي الحروف', host: 'سارة', players: 5, maxPlayers: 8, status: 'playing' },
    { id: '3', name: 'مسابقة الكلمات', host: 'محمد', players: 2, maxPlayers: 4, status: 'waiting' },
    { id: '4', name: 'لعبة العائلة', host: 'فاطمة', players: 4, maxPlayers: 6, status: 'waiting' },
  ];
  
  const handleJoinWithCode = (e) => {
    e.preventDefault();
    if (roomCode.trim()) {
      console.log('الانضمام بالكود:', roomCode);
      // توجيه اللاعب إلى الغرفة المطلوبة
    }
  };
  
  return (
    <PageContainer>
      <Header />
      <main className="container">
        <RandomDua />
        
        <LobbySection>
          <LobbyTitle>اللوبي</LobbyTitle>
          
          <TabsContainer>
            <Tab 
              active={activeTab === 'public'} 
              onClick={() => setActiveTab('public')}
            >
              <FaSearch />
              <span>الغرف العامة</span>
            </Tab>
            <Tab 
              active={activeTab === 'code'} 
              onClick={() => setActiveTab('code')}
            >
              <FaKey />
              <span>الانضمام بكود</span>
            </Tab>
            <CreateRoomButton to="/create-room">
              <FaPlus />
              <span>إنشاء غرفة جديدة</span>
            </CreateRoomButton>
          </TabsContainer>
          
          <TabContent>
            {activeTab === 'public' ? (
              <RoomsTable>
                <RoomsTableHeader>
                  <RoomsTableRow>
                    <RoomsTableHeaderCell>اسم الغرفة</RoomsTableHeaderCell>
                    <RoomsTableHeaderCell>المضيف</RoomsTableHeaderCell>
                    <RoomsTableHeaderCell>اللاعبين</RoomsTableHeaderCell>
                    <RoomsTableHeaderCell>الحالة</RoomsTableHeaderCell>
                    <RoomsTableHeaderCell></RoomsTableHeaderCell>
                  </RoomsTableRow>
                </RoomsTableHeader>
                <RoomsTableBody>
                  {publicRooms.map(room => (
                    <RoomsTableRow key={room.id}>
                      <RoomsTableCell>{room.name}</RoomsTableCell>
                      <RoomsTableCell>{room.host}</RoomsTableCell>
                      <RoomsTableCell>{room.players}/{room.maxPlayers}</RoomsTableCell>
                      <RoomsTableCell>
                        <RoomStatus status={room.status}>
                          {room.status === 'waiting' ? 'في الانتظار' : 'قيد اللعب'}
                        </RoomStatus>
                      </RoomsTableCell>
                      <RoomsTableCell>
                        <JoinButton 
                          disabled={room.status !== 'waiting'} 
                          to={room.status === 'waiting' ? `/game-room/${room.id}` : '#'}
                        >
                          انضمام
                        </JoinButton>
                      </RoomsTableCell>
                    </RoomsTableRow>
                  ))}
                </RoomsTableBody>
              </RoomsTable>
            ) : (
              <CodeJoinForm onSubmit={handleJoinWithCode}>
                <FormTitle>الانضمام بكود الغرفة</FormTitle>
                <FormDescription>
                  أدخل كود الغرفة الذي حصلت عليه من المضيف للانضمام إلى الغرفة الخاصة.
                </FormDescription>
                <CodeInput
                  type="text"
                  placeholder="أدخل كود الغرفة هنا..."
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  required
                />
                <SubmitButton type="submit">انضمام</SubmitButton>
              </CodeJoinForm>
            )}
          </TabContent>
        </LobbySection>
      </main>
      <Footer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LobbySection = styled.section`
  margin: var(--spacing-xl) 0;
`;

const LobbyTitle = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
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
  flex: 1;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  }
`;

const CreateRoomButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  background-color: var(--button-success);
  color: white;
  text-decoration: none;
  transition: all var(--transition-speed);
  flex: 1;
  
  &:hover {
    background-color: var(--button-success);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const TabContent = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const RoomsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const RoomsTableHeader = styled.thead`
  border-bottom: 2px solid var(--border-color);
`;

const RoomsTableBody = styled.tbody``;

const RoomsTableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
  transition: background-color var(--transition-speed);
  
  &:hover {
    background-color: var(--background-color);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RoomsTableHeaderCell = styled.th`
  text-align: right;
  padding: var(--spacing-sm);
  color: var(--text-secondary);
  font-weight: 600;
`;

const RoomsTableCell = styled.td`
  padding: var(--spacing-sm);
  color: var(--text-color);
`;

const RoomStatus = styled.span`
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props => props.status === 'waiting' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(52, 152, 219, 0.2)'};
  color: ${props => props.status === 'waiting' ? 'var(--button-success)' : 'var(--primary-color)'};
`;

const JoinButton = styled(Link)`
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.disabled ? 'var(--border-color)' : 'var(--button-primary)'};
  color: ${props => props.disabled ? 'var(--text-secondary)' : 'white'};
  text-decoration: none;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: ${props => props.disabled ? 'var(--border-color)' : 'var(--primary-color)'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : 'var(--shadow-sm)'};
  }
`;

const CodeJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  padding: var(--spacing-lg);
`;

const FormTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  text-align: center;
`;

const FormDescription = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-md);
`;

const CodeInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 2px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: var(--spacing-md);
  transition: border-color var(--transition-speed);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-xl);
  border-radius: var(--border-radius-md);
  background-color: var(--button-primary);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export default Lobby;
