import React, { createContext, useState, useContext, useEffect } from 'react';

// إنشاء سياق المستخدم
const UserContext = createContext();

// مزود سياق المستخدم
export const UserProvider = ({ children }) => {
  // التحقق من وجود بيانات المستخدم في التخزين المحلي
  const getInitialUserState = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        return {
          username: parsedUser.username,
          isLoggedIn: true
        };
      } catch (error) {
        return {
          username: '',
          isLoggedIn: false
        };
      }
    }
    return {
      username: '',
      isLoggedIn: false
    };
  };

  // حالة المستخدم الحالي
  const [user, setUser] = useState(getInitialUserState);

  // تسجيل الدخول
  const login = (username) => {
    const userData = {
      username,
      isLoggedIn: true
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // تسجيل الخروج
  const logout = () => {
    setUser({
      username: '',
      isLoggedIn: false
    });
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ 
      username: user.username, 
      isLoggedIn: user.isLoggedIn, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// هوك مخصص لاستخدام سياق المستخدم
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
