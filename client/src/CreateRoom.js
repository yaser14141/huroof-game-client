import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUsers, FaLock, FaGlobe, FaKey, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RandomDua from './components/RandomDua';
import { useTheme } from './context/ThemeContext';
import { useUser } from './context/UserContext';
import { useGame } from './context/GameContext';

const CreateRoom = () => {
  const { theme } = useTheme();
  const { username } = useUser();
  const { createRoom } = useGame();
  const navigate = useNavigate();
  
  const [roomData, setRoomData] = useState({
    name: '',
    maxPlayers: 6,
    roomType: 'public',
    answerTime: 30,
    penaltyTime: 10,
    team1Color: '#e74c3c',
    team2Color: '#3498db'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // إنشاء غرفة جديدة
    const newRoom = createRoom({
      ...roomData,
      host: username,
      createdAt: new Date().toISOString()
    });
    
    // توجيه المستخدم إلى صفحة الغرفة
    navigate(`/game-room/${newRoom.id}`);
  };
  
  return (
    <PageContainer>
      <Header />
      <main className="container">
        <RandomDua />
        
        <CreateRoomSection>
          <BackLink to="/lobby">
            <FaArrowLeft />
            <span>العودة إلى اللوبي</span>
          </BackLink>
          
          <SectionTitle>إنشاء غرفة جديدة</SectionTitle>
          
          <FormCard>
            <CreateRoomForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">اسم الغرفة</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={roomData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسم الغرفة..."
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="maxPlayers">عدد اللاعبين</FormLabel>
                <FormSelect
                  id="maxPlayers"
                  name="maxPlayers"
                  value={roomData.maxPlayers}
                  onChange={handleChange}
                >
                  <option value="4">4 لاعبين</option>
                  <option value="6">6 لاعبين</option>
                  <option value="8">8 لاعبين</option>
                  <option value="10">10 لاعبين</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>نوع الغرفة</FormLabel>
                <RoomTypeOptions>
                  <RoomTypeOption>
                    <RoomTypeRadio
                      type="radio"
                      id="public"
                      name="roomType"
                      value="public"
                      checked={roomData.roomType === 'public'}
                      onChange={handleChange}
                    />
                    <RoomTypeLabel htmlFor="public">
                      <FaGlobe />
                      <span>عامة</span>
                      <RoomTypeDescription>تظهر في قائمة السيرفرات</RoomTypeDescription>
                    </RoomTypeLabel>
                  </RoomTypeOption>
                  
                  <RoomTypeOption>
                    <RoomTypeRadio
                      type="radio"
                      id="code"
                      name="roomType"
                      value="code"
                      checked={roomData.roomType === 'code'}
                      onChange={handleChange}
                    />
                    <RoomTypeLabel htmlFor="code">
                      <FaKey />
                      <span>بكود</span>
                      <RoomTypeDescription>يُدخله اللاعب عند الانضمام</RoomTypeDescription>
                    </RoomTypeLabel>
                  </RoomTypeOption>
                  
                  <RoomTypeOption>
                    <RoomTypeRadio
                      type="radio"
                      id="private"
                      name="roomType"
                      value="private"
                      checked={roomData.roomType === 'private'}
                      onChange={handleChange}
                    />
                    <RoomTypeLabel htmlFor="private">
                      <FaLock />
                      <span>خاصة</span>
                      <RoomTypeDescription>تشارك برابط مباشر فقط</RoomTypeDescription>
                    </RoomTypeLabel>
                  </RoomTypeOption>
                </RoomTypeOptions>
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="answerTime">مدة الإجابة (ثانية)</FormLabel>
                  <FormInput
                    type="number"
                    id="answerTime"
                    name="answerTime"
                    value={roomData.answerTime}
                    onChange={handleChange}
                    min="10"
                    max="60"
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="penaltyTime">مدة العقوبة (ثانية)</FormLabel>
                  <FormInput
                    type="number"
                    id="penaltyTime"
                    name="penaltyTime"
                    value={roomData.penaltyTime}
                    onChange={handleChange}
                    min="5"
                    max="30"
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="team1Color">لون الفريق الأول</FormLabel>
                  <ColorPickerContainer>
                    <ColorPreview color={roomData.team1Color} />
                    <ColorPicker
                      type="color"
                      id="team1Color"
                      name="team1Color"
                      value={roomData.team1Color}
                      onChange={handleChange}
                    />
                  </ColorPickerContainer>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="team2Color">لون الفريق الثاني</FormLabel>
                  <ColorPickerContainer>
                    <ColorPreview color={roomData.team2Color} />
                    <ColorPicker
                      type="color"
                      id="team2Color"
                      name="team2Color"
                      value={roomData.team2Color}
                      onChange={handleChange}
                    />
                  </ColorPickerContainer>
                </FormGroup>
              </FormRow>
              
              <SubmitButton type="submit">
                <FaUsers />
                <span>إنشاء الغرفة</span>
              </SubmitButton>
            </CreateRoomForm>
          </FormCard>
        </CreateRoomSection>
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

const CreateRoomSection = styled.section`
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

const SectionTitle = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const FormCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto;
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const CreateRoomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const FormRow = styled.div`
  display: flex;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormLabel = styled.label`
  color: var(--text-color);
  font-weight: 600;
`;

const FormInput = styled.input`
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

const FormSelect = styled.select`
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

const RoomTypeOptions = styled.div`
  display: flex;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RoomTypeOption = styled.div`
  flex: 1;
  position: relative;
`;

const RoomTypeRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + label {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  &:checked + label span {
    color: white;
  }
`;

const RoomTypeLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  svg {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-xs);
  }
  
  span {
    font-weight: 600;
  }
`;

const RoomTypeDescription = styled.small`
  color: var(--text-secondary);
  text-align: center;
  font-size: 0.8rem;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const ColorPreview = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid var(--border-color);
`;

const ColorPicker = styled.input`
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

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--button-success);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: var(--spacing-md);
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--button-success);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export default CreateRoom;
