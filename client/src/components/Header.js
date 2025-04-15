import React from 'react';
import styled from 'styled-components';
import { FaMoon, FaSun, FaUser } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, username, logout } = useUser();

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo to="/">
            <LogoText>حروف مع ياسر</LogoText>
          </Logo>

          <NavMenu>
            <NavItem to="/">الرئيسية</NavItem>
            <NavItem to="/lobby">اللوبي</NavItem>
            {isLoggedIn ? (
              <>
                <UserInfo>
                  <FaUser />
                  <span>{username}</span>
                </UserInfo>
                <LogoutButton onClick={logout}>تسجيل الخروج</LogoutButton>
              </>
            ) : (
              <NavItem to="/login">تسجيل الدخول</NavItem>
            )}
            <ThemeToggle onClick={toggleTheme}>
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </ThemeToggle>
          </NavMenu>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: var(--card-bg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0;
  transition: color var(--transition-speed);
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    gap: var(--spacing-sm);
  }
`;

const NavItem = styled(Link)`
  color: var(--text-color);
  font-weight: 600;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: var(--spacing-xs);
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--border-color);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-color);
  font-weight: 600;

  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--secondary-color);
  font-weight: 600;
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--secondary-color);
    color: white;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: var(--spacing-xs);
  }
`;

export default Header;
