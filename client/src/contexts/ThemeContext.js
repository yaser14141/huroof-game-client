import React, { createContext, useState, useContext, useEffect } from 'react';

// إنشاء سياق الثيم
const ThemeContext = createContext();

// مزود سياق الثيم
export const ThemeProvider = ({ children }) => {
  // التحقق من وجود تفضيل مسبق في التخزين المحلي
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  };

  // حالة الثيم الحالي
  const [theme, setTheme] = useState(getInitialTheme);

  // تبديل الثيم بين المضيء والمظلم
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // تطبيق الثيم على عنصر الجذر عند تغييره
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// هوك مخصص لاستخدام سياق الثيم
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
