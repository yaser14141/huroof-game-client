import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaYoutube, FaTwitch, FaTiktok } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <FooterTitle>حروف مع ياسر</FooterTitle>
            <FooterText>
              لعبة جماعية تفاعلية أونلاين، تعتمد على الإجابة على أسئلة تبدأ بحرف معين، داخل شبكة من الحروف.
            </FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>تواصل معنا</FooterTitle>
            <SocialLinks>
              <SocialLink href="https://www.instagram.com/yaser_1473" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
                <span>انستغرام</span>
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@yaser14141" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
                <span>يوتيوب</span>
              </SocialLink>
              <SocialLink href="https://www.twitch.tv/yaser14141" target="_blank" rel="noopener noreferrer">
                <FaTwitch />
                <span>تويتش</span>
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@mssh6h" target="_blank" rel="noopener noreferrer">
                <FaTiktok />
                <span>تيك توك</span>
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
        
        <Copyright>
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} حروف مع ياسر
        </Copyright>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--card-bg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg) 0;
  margin-top: var(--spacing-xl);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const FooterTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  font-size: 1.2rem;
`;

const FooterText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  transition: color var(--transition-speed);
  
  &:hover {
    color: var(--primary-color);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

export default Footer;
