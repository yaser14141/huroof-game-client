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
          password: parsedUser.password || '',
          email: parsedUser.email || '',
          isLoggedIn: true
        };
      } catch (error) {
        return {
          username: '',
          password: '',
          email: '',
          isLoggedIn: false
        };
      }
    }
    return {
      username: '',
      password: '',
      email: '',
      isLoggedIn: false
    };
  };

  // حالة المستخدم الحالي
  const [user, setUser] = useState(getInitialUserState);

  // تسجيل الدخول
  const login = (username, password) => {
    const userData = {
      username,
      password,
      isLoggedIn: true
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // تسجيل مستخدم جديد
  const register = (username, password, email = '') => {
    const userData = {
      username,
      password,
      email,
      isLoggedIn: true
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // تحديث بيانات المستخدم
  const updateUserData = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // تسجيل الخروج
  const logout = () => {
    setUser({
      username: '',
      password: '',
      email: '',
      isLoggedIn: false
    });
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ 
      username: user.username,
      email: user.email,
      isLoggedIn: user.isLoggedIn, 
      login, 
      register,
      updateUserData,
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
