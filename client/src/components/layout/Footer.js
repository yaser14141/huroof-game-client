import React from 'react';
import './Footer.css';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">حروف مع ياسر</h3>
            <p className="footer-description">
              لعبة تفاعلية جماعية أونلاين تعتمد على الإجابة على أسئلة تبدأ بحرف معين
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">تواصل معنا</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} حروف مع ياسر. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
