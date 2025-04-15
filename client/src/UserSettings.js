import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaSave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';
import { useUser } from './context/UserContext';

const UserSettings = () => {
  const { theme } = useTheme();
  const { username, email, updateUserData, logout } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: username || '',
    email: email || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    // التحقق من البيانات
    if (!formData.username.trim()) {
      setMessage({ type: 'error', text: 'يرجى إدخال اسم المستخدم' });
      return;
    }
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'كلمة المرور الجديدة وتأكيدها غير متطابقين' });
      return;
    }
    
    if (formData.email && !validateEmail(formData.email)) {
      setMessage({ type: 'error', text: 'يرجى إدخال بريد إلكتروني صحيح' });
      return;
    }
    
    // تحديث بيانات المستخدم
    const updatedData = {
      username: formData.username,
      email: formData.email
    };
    
    if (formData.newPassword) {
      updatedData.password = formData.newPassword;
    }
    
    updateUserData(updatedData);
    setMessage({ type: 'success', text: 'تم تحديث بيانات الحساب بنجاح' });
    
    // إعادة تعيين حقول كلمة المرور
    setFormData(prev => ({
      ...prev,
      password: '',
      newPassword: '',
      confirmPassword: ''
    }));
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
        
        <SettingsSection>
          <SectionTitle>إعدادات الحساب</SectionTitle>
          
          <SettingsCard>
            {message.text && (
              <MessageBox type={message.type}>
                {message.text}
              </MessageBox>
            )}
            
            <SettingsForm onSubmit={handleSubmit}>
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
                />
              </FormGroup>
              
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
              
              <FormDivider />
              
              <FormGroup>
                <FormLabel htmlFor="password">
                  <FaLock />
                  <span>كلمة المرور الحالية</span>
                </FormLabel>
                <FormInput
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="أدخل كلمة المرور الحالية"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="newPassword">
                  <FaLock />
                  <span>كلمة المرور الجديدة (اتركها فارغة إذا لم ترغب في تغييرها)</span>
                </FormLabel>
                <FormInput
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="أدخل كلمة المرور الجديدة"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="confirmPassword">
                  <FaLock />
                  <span>تأكيد كلمة المرور الجديدة</span>
                </FormLabel>
                <FormInput
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                />
              </FormGroup>
              
              <ButtonsContainer>
                <SubmitButton type="submit">
                  <FaSave />
                  <span>حفظ التغييرات</span>
                </SubmitButton>
                
                <CancelButton type="button" onClick={() => navigate('/')}>
                  إلغاء
                </CancelButton>
              </ButtonsContainer>
            </SettingsForm>
          </SettingsCard>
        </SettingsSection>
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

const SettingsSection = styled.section`
  margin: var(--spacing-xl) 0;
`;

const SectionTitle = styled.h1`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const SettingsCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
`;

const MessageBox = styled.div`
  background-color: ${props => 
    props.type === 'error' ? 'rgba(231, 76, 60, 0.1)' : 
    props.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 
    'rgba(52, 152, 219, 0.1)'
  };
  color: ${props => 
    props.type === 'error' ? 'var(--button-danger)' : 
    props.type === 'success' ? 'var(--button-success)' : 
    'var(--primary-color)'
  };
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--spacing-md);
  text-align: center;
`;

const SettingsForm = styled.form`
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

const FormDivider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color);
  margin: var(--spacing-sm) 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
  
  @media (max-width: 576px) {
    flex-direction: column;
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
  flex: 1;
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

const CancelButton = styled.button`
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: var(--background-color);
  color: var(--text-color);
  font-weight: 600;
  border: 1px solid var(--border-color);
  cursor: pointer;
  flex: 1;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--border-color);
  }
`;

export default UserSettings;
