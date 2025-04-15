import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaVolumeUp, FaVolumeMute, FaComments, FaUsers, FaGamepad } from 'react-icons/fa';
import { useGame } from '../context/GameContext';

const GameSettings = () => {
  const { updateTeamColors, teamColors } = useGame();
  
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicEnabled: true,
    notificationsEnabled: true,
    team1Color: teamColors.team1,
    team2Color: teamColors.team2,
    answerTime: 30,
    penaltyTime: 10,
    winCondition: 'path' // path, majority, all
  });
  
  // تحديث ألوان الفرق عند تغييرها
  useEffect(() => {
    updateTeamColors(settings.team1Color, settings.team2Color);
  }, [settings.team1Color, settings.team2Color]);
  
  // تحديث الإعدادات
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsTitle>إعدادات اللعبة</SettingsTitle>
      </SettingsHeader>
      
      <SettingsSection>
        <SectionTitle>الصوت والإشعارات</SectionTitle>
        <SettingsGroup>
          <SettingItem>
            <SettingLabel htmlFor="soundEnabled">
              {settings.soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
              <span>أصوات اللعبة</span>
            </SettingLabel>
            <ToggleSwitch>
              <input
                type="checkbox"
                id="soundEnabled"
                name="soundEnabled"
                checked={settings.soundEnabled}
                onChange={handleChange}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
          
          <SettingItem>
            <SettingLabel htmlFor="musicEnabled">
              {settings.musicEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
              <span>الموسيقى</span>
            </SettingLabel>
            <ToggleSwitch>
              <input
                type="checkbox"
                id="musicEnabled"
                name="musicEnabled"
                checked={settings.musicEnabled}
                onChange={handleChange}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
          
          <SettingItem>
            <SettingLabel htmlFor="notificationsEnabled">
              <FaComments />
              <span>الإشعارات</span>
            </SettingLabel>
            <ToggleSwitch>
              <input
                type="checkbox"
                id="notificationsEnabled"
                name="notificationsEnabled"
                checked={settings.notificationsEnabled}
                onChange={handleChange}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </SettingsGroup>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>ألوان الفرق</SectionTitle>
        <SettingsGroup>
          <SettingItem>
            <SettingLabel htmlFor="team1Color">
              <TeamColorPreview color={settings.team1Color} />
              <span>لون الفريق الأول</span>
            </SettingLabel>
            <ColorPicker
              type="color"
              id="team1Color"
              name="team1Color"
              value={settings.team1Color}
              onChange={handleChange}
            />
          </SettingItem>
          
          <SettingItem>
            <SettingLabel htmlFor="team2Color">
              <TeamColorPreview color={settings.team2Color} />
              <span>لون الفريق الثاني</span>
            </SettingLabel>
            <ColorPicker
              type="color"
              id="team2Color"
              name="team2Color"
              value={settings.team2Color}
              onChange={handleChange}
            />
          </SettingItem>
        </SettingsGroup>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>إعدادات اللعب</SectionTitle>
        <SettingsGroup>
          <SettingItem>
            <SettingLabel htmlFor="answerTime">
              <FaGamepad />
              <span>وقت الإجابة (ثانية)</span>
            </SettingLabel>
            <RangeInput
              type="range"
              id="answerTime"
              name="answerTime"
              min="10"
              max="60"
              step="5"
              value={settings.answerTime}
              onChange={handleChange}
            />
            <RangeValue>{settings.answerTime} ثانية</RangeValue>
          </SettingItem>
          
          <SettingItem>
            <SettingLabel htmlFor="penaltyTime">
              <FaGamepad />
              <span>وقت العقوبة (ثانية)</span>
            </SettingLabel>
            <RangeInput
              type="range"
              id="penaltyTime"
              name="penaltyTime"
              min="5"
              max="30"
              step="5"
              value={settings.penaltyTime}
              onChange={handleChange}
            />
            <RangeValue>{settings.penaltyTime} ثانية</RangeValue>
          </SettingItem>
          
          <SettingItem>
            <SettingLabel htmlFor="winCondition">
              <FaUsers />
              <span>شرط الفوز</span>
            </SettingLabel>
            <SelectInput
              id="winCondition"
              name="winCondition"
              value={settings.winCondition}
              onChange={handleChange}
            >
              <option value="path">تكوين مسار كامل</option>
              <option value="majority">الاستحواذ على أغلبية الخلايا</option>
              <option value="all">الاستحواذ على جميع الخلايا</option>
            </SelectInput>
          </SettingItem>
        </SettingsGroup>
      </SettingsSection>
      
      <SaveButton>حفظ الإعدادات</SaveButton>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const SettingsHeader = styled.div`
  margin-bottom: var(--spacing-sm);
`;

const SettingsTitle = styled.h3`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.2rem;
`;

const SettingsSection = styled.div`
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

const SettingsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
`;

const SettingLabel = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-color);
  font-weight: 600;
  flex: 1;
  
  svg {
    color: var(--primary-color);
    font-size: 1.2rem;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: var(--primary-color);
    }
    
    &:checked + span:before {
      transform: translateX(26px);
    }
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: var(--transition-speed);
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: var(--transition-speed);
    border-radius: 50%;
  }
`;

const TeamColorPreview = styled.div`
  width: 24px;
  height: 24px;
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

const RangeInput = styled.input`
  flex: 1;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: var(--border-color);
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: none;
  }
`;

const RangeValue = styled.span`
  min-width: 80px;
  text-align: center;
  color: var(--text-color);
  font-weight: 600;
`;

const SelectInput = styled.select`
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SaveButton = styled.button`
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--button-success);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-top: var(--spacing-sm);
  transition: all var(--transition-speed);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export default GameSettings;
