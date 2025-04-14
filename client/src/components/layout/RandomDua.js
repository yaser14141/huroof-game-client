import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const RandomTip = () => {
  const { theme } = useTheme();
  const [currentTip, setCurrentTip] = useState('');
  const [currentSource, setCurrentSource] = useState('');
  
  // قائمة نصائح اللعبة
  const tips = [
    {
      text: "تعاون مع فريقك للإجابة على الأسئلة بسرعة وتكوين مسار متصل",
      source: "نصائح اللعب"
    },
    {
      text: "ركز على الحروف التي تساعد في تكوين مسار متصل من جانب إلى آخر",
      source: "استراتيجية اللعب"
    },
    {
      text: "حاول منع الفريق المنافس من تكوين مسار متصل عبر اختيار الخلايا الاستراتيجية",
      source: "تكتيكات متقدمة"
    },
    {
      text: "استخدم زر إعادة ترتيب الحروف إذا كانت الحروف الحالية صعبة",
      source: "أدوات اللعبة"
    },
    {
      text: "يمكنك تغيير ألوان الفرق لتناسب تفضيلاتك",
      source: "تخصيص اللعبة"
    },
    {
      text: "كن سريعاً في الضغط على زر 'أنا بجاوب' لتحصل على فرصة الإجابة",
      source: "نصائح سريعة"
    },
    {
      text: "تذكر أن الهدف هو تكوين مسار متصل من جانب إلى آخر بلون فريقك",
      source: "هدف اللعبة"
    },
    {
      text: "استخدم المحادثة الداخلية للتواصل مع فريقك وتنسيق الاستراتيجية",
      source: "التواصل الفعال"
    },
    {
      text: "تدرب على التفكير السريع في كلمات تبدأ بحروف مختلفة",
      source: "تحسين المهارات"
    },
    {
      text: "استمتع باللعب وتعلم كلمات جديدة مع أصدقائك",
      source: "روح اللعبة"
    }
  ];
  
  // تغيير النصيحة كل 30 ثانية
  useEffect(() => {
    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex].text);
      setCurrentSource(tips[randomIndex].source);
    };
    
    // تعيين نصيحة عشوائية عند التحميل
    getRandomTip();
    
    // تغيير النصيحة كل 30 ثانية
    const interval = setInterval(() => {
      getRandomTip();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <TipContainer>
      <TipText>{currentTip}</TipText>
      <TipSource>{currentSource}</TipSource>
    </TipContainer>
  );
};

const TipContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
  border-right: 3px solid var(--primary-color);
`;

const TipText = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  line-height: 1.6;
`;

const TipSource = styled.p`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-style: italic;
`;

export default RandomTip;
