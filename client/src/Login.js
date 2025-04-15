import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RandomDua from './components/layout/RandomDua';
import { useTheme } from './context/ThemeContext';
import { useUser } from './context/UserContext';

const Login = () => {
  const { theme } = useTheme();
  const { login, register } = useUser();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // التحقق من البيانات
    if (!formData.username.trim()) {
      setError('يرجى إدخال اسم المستخدم');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }
    
    if (!isLogin && formData.email && !validateEmail(formData.email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    
    // تسجيل الدخول أو إنشاء حساب جديد
    if (isLogin) {
      login(formData.username, formData.password);
    } else {
      register(formData.username, formData.password, formData.email);
    }
    
    // التوجيه إلى الصفحة الرئيسية
    navigate('/');
  };
  
  // التحقق من صحة البريد الإلكتروني
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  return (
    <PageContainer>
      <Header />
      <main className="container">
        <RandomDua />
        
        <AuthSection>
          <AuthCard>
            <AuthHeader>
              <AuthTitle>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</AuthTitle>
              <AuthToggle>
                {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                <ToggleButton onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
                </ToggleButton>
              </AuthToggle>
            </AuthHeader>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <AuthForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="username">
                  <FaUser />
                  <span>اسم المستخدم</span>
                </FormLabel>
                <FormInput
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="أدخل اسم المستخدم"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="password">
                  <FaLock />
                  <span>كلمة المرور</span>
                </FormLabel>
                <FormInput
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </FormGroup>
              
              {!isLogin && (
                <FormGroup>
                  <FormLabel htmlFor="email">
                    <FaEnvelope />
                    <span>البريد الإلكتروني (اختياري)</span>
                  </FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="أدخل البريد الإلكتروني"
                  />
                </FormGroup>
              )}
              
              <SubmitButton type="submit">
                <FaSignInAlt />
                <span>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}</span>
              </SubmitButton>
            </AuthForm>
          </AuthCard>
        </AuthSection>
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

const AuthSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: var(--spacing-xl) 0;
`;

const AuthCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  width: 100%;
  max-width: 500px;
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const AuthHeader = styled.div`
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const AuthTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  font-size: 1.8rem;
`;

const AuthToggle = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 600;
  margin-right: var(--spacing-xs);
  transition: color var(--transition-speed);
  
  &:hover {
    color: var(--secondary-color);
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(231, 76, 60, 0.1);
  color: var(--button-danger);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--spacing-md);
  text-align: center;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const FormLabel = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-color);
  font-weight: 600;
  
  svg {
    color: var(--primary-color);
  }
`;

const FormInput = styled.input`
  padding: var(--spacing-md);
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

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--button-primary);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: var(--spacing-sm);
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export default Login;
