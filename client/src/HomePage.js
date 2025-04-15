import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaGamepad, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SquareCell from './components/SquareCell';
import { useTheme } from './context/ThemeContext';

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <PageContainer>
      <Header />
      <main className="container">
        
        <HeroSection>
          <HeroTitle>حروف مع ياسر</HeroTitle>
          <HeroSubtitle>لعبة جماعية تفاعلية أونلاين</HeroSubtitle>
          
          <ButtonsContainer>
            <PrimaryButton to="/create-room">
              <FaGamepad />
              <span>إنشاء لعبة (هوست)</span>
            </PrimaryButton>
            
            <SecondaryButton to="/lobby">
              <FaUsers />
              <span>الانضمام إلى لعبة (لاعب)</span>
            </SecondaryButton>
          </ButtonsContainer>
        </HeroSection>
        
        <ContentSection>
          <ContentRow>
            <ContentColumn>
              <SectionTitle>
                <FaInfoCircle />
                <span>شرح اللعبة</span>
              </SectionTitle>
              <GameDescription>
                <p>
                  "حروف مع ياسر" هي لعبة جماعية تفاعلية أونلاين، تعتمد على الإجابة على أسئلة تبدأ بحرف معين، داخل شبكة من الحروف.
                </p>
                <p>
                  كل إجابة صحيحة تُمكّن الفريق من تلوين خلية معينة. الهدف هو تكوين مسار كامل عبر الخلية بلون الفريق.
                </p>
                <p>
                  <strong>قاعدة مهمة:</strong> يجب توصيل نفس اللون في الطرف المقابل له في الخلية لتحقيق الفوز.
                </p>
                <p>
                  اللعبة مستوحاة من برامج شهيرة وتمت إعادة تصميمها بشكل تقني حديث لتكون قابلة للعب أونلاين بشكل سهل وسريع.
                </p>
              </GameDescription>
            </ContentColumn>
            
            <ContentColumn>
              <SectionTitle>تواصل معنا</SectionTitle>
              <SocialLinks>
                <SocialLink href="https://www.instagram.com/yaser_1473" target="_blank" rel="noopener noreferrer">
                  <SocialIcon className="instagram" />
                  <SocialName>انستغرام</SocialName>
                  <SocialUsername>@yaser_1473</SocialUsername>
                </SocialLink>
                
                <SocialLink href="https://www.youtube.com/@yaser14141" target="_blank" rel="noopener noreferrer">
                  <SocialIcon className="youtube" />
                  <SocialName>يوتيوب</SocialName>
                  <SocialUsername>@yaser14141</SocialUsername>
                </SocialLink>
                
                <SocialLink href="https://www.twitch.tv/yaser14141" target="_blank" rel="noopener noreferrer">
                  <SocialIcon className="twitch" />
                  <SocialName>تويتش</SocialName>
                  <SocialUsername>yaser14141</SocialUsername>
                </SocialLink>
                
                <SocialLink href="https://www.tiktok.com/@mssh6h" target="_blank" rel="noopener noreferrer">
                  <SocialIcon className="tiktok" />
                  <SocialName>تيك توك</SocialName>
                  <SocialUsername>@mssh6h</SocialUsername>
                </SocialLink>
              </SocialLinks>
            </ContentColumn>
          </ContentRow>
        </ContentSection>
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

const HeroSection = styled.section`
  text-align: center;
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-lg);
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all var(--transition-speed);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
  
  @media (max-width: 576px) {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 1rem;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: var(--button-primary);
  color: var(--button-text);
  
  &:hover {
    background-color: var(--primary-color);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: var(--button-secondary);
  color: var(--button-text);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const ContentSection = styled.section`
  margin: var(--spacing-xl) 0;
`;

const ContentRow = styled.div`
  display: flex;
  gap: var(--spacing-xl);
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: var(--spacing-lg);
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
  
  &:hover {
    box-shadow: var(--shadow-lg);
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  font-size: 1.5rem;
  
  svg {
    font-size: 1.2rem;
  }
`;

const GameDescription = styled.div`
  color: var(--text-color);
  line-height: 1.8;
  
  p {
    margin-bottom: var(--spacing-md);
  }
  
  strong {
    color: var(--secondary-color);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  transition: background-color var(--transition-speed);
  
  &:hover {
    background-color: var(--background-color);
  }
  
  &:hover .instagram {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  }
  
  &:hover .youtube {
    background-color: #ff0000;
  }
  
  &:hover .twitch {
    background-color: #6441a5;
  }
  
  &:hover .tiktok {
    background-color: #000000;
  }
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--border-color);
  transition: background-color var(--transition-speed);
`;

const SocialName = styled.span`
  font-weight: 600;
  color: var(--text-color);
`;

const SocialUsername = styled.span`
  color: var(--text-secondary);
  margin-right: auto;
`;

export default HomePage;
