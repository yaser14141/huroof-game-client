import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { useUser } from './context/UserContext';
import './HomePage.css';
import { FaGamepad, FaSignInAlt } from 'react-icons/fa';

const HomePage = () => {
  const { theme } = useTheme();
  const { login, isLoggedIn } = useUser();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('الرجاء إدخال اسم المستخدم');
      return;
    }
    
    login(username);
    navigate('/lobby');
  };
  
  return (
    <div className="home-page">
      <div className="container">
        <div className="home-content">
          <div className="home-header">
            <h1 className="home-title">حروف مع ياسر</h1>
            <p className="home-subtitle">لعبة تفاعلية جماعية أونلاين تعتمد على الإجابة على أسئلة تبدأ بحرف معين</p>
          </div>
          
          <div className="card home-card">
            {isLoggedIn ? (
              <div className="welcome-section">
                <h2>مرحباً بك في لعبة حروف مع ياسر</h2>
                <p>يمكنك الآن الانضمام إلى غرفة موجودة أو إنشاء غرفة جديدة</p>
                <div className="home-actions">
                  <Link to="/lobby" className="primary-button">
                    <FaGamepad className="button-icon" /> دخول اللوبي
                  </Link>
                </div>
              </div>
            ) : (
              <div className="login-section">
                <h2>تسجيل الدخول</h2>
                <p>أدخل اسمك للبدء في اللعب</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="username">اسم المستخدم</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="أدخل اسمك هنا"
                    />
                  </div>
                  
                  <button type="submit" className="primary-button">
                    <FaSignInAlt className="button-icon" /> دخول
                  </button>
                </form>
              </div>
            )}
          </div>
          
          <div className="game-features">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>لعبة تفاعلية</h3>
              <p>العب مع أصدقائك في وقت واحد عبر الإنترنت</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>تحدي ذهني</h3>
              <p>اختبر معلوماتك وسرعة بديهتك في الإجابة على الأسئلة</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>منافسة حماسية</h3>
              <p>تنافس مع فريقك للفوز وتلوين أكبر عدد من الخلايا</p>
            </div>
          </div>
          
          <div className="game-instructions">
            <h2>كيفية اللعب</h2>
            <ol className="instructions-list">
              <li>سجل الدخول باسمك</li>
              <li>انضم إلى غرفة موجودة أو أنشئ غرفة جديدة</li>
              <li>انتظر حتى يكتمل عدد اللاعبين ويتم توزيع الفرق</li>
              <li>أجب على الأسئلة التي تبدأ بالحرف المحدد</li>
              <li>لوّن الخلايا بلون فريقك للفوز</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
