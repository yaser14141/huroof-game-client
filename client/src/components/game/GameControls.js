import React from 'react';
import './GameControls.css';
import { FaRandom, FaExchangeAlt, FaPalette, FaTrophy, FaCopy, FaSearch } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const GameControls = ({ onShuffle, onChangeColors, onAnnounceWinner, onCopyLetters, onSizeChange, size }) => {
  const { theme } = useTheme();
  
  return (
    <div className="game-controls">
      <button 
        className="control-button shuffle-button" 
        onClick={onShuffle}
        title="إعادة ترتيب الحروف"
        aria-label="إعادة ترتيب الحروف"
      >
        <FaRandom />
      </button>
      
      <button 
        className="control-button colors-button" 
        onClick={onChangeColors}
        title="تغيير ألوان الفرق"
        aria-label="تغيير ألوان الفرق"
      >
        <FaPalette />
      </button>
      
      <button 
        className="control-button winner-button" 
        onClick={onAnnounceWinner}
        title="إعلان الفوز"
        aria-label="إعلان الفوز"
      >
        <FaTrophy />
      </button>
      
      <button 
        className="control-button copy-button" 
        onClick={onCopyLetters}
        title="نسخ الحروف"
        aria-label="نسخ الحروف"
      >
        <FaCopy />
      </button>
      
      <div className="size-control">
        <span className="size-label">حجم المربع</span>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={size} 
          onChange={onSizeChange} 
          className="size-slider"
          aria-label="تغيير حجم المربع"
        />
        <span className="size-value">{size}</span>
      </div>
      
      <button 
        className="control-button search-button" 
        onClick={() => {}}
        title="البحث عن حرف"
        aria-label="البحث عن حرف"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default GameControls;
