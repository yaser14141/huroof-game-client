import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes, FaLightbulb, FaHourglassHalf } from 'react-icons/fa';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';

const QuestionDisplay = () => {
  const { currentQuestion, answerQuestion } = useGame();
  const { username } = useUser();
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState(null); // null, 'correct', 'incorrect'
  
  // إعادة ضبط الحالة عند تغيير السؤال
  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(30); // يمكن استخدام قيمة من الإعدادات
      setShowHint(false);
      setUserAnswer('');
      setAnswerStatus(null);
    }
  }, [currentQuestion]);
  
  // تشغيل المؤقت عندما يكون هناك سؤال
  useEffect(() => {
    let timer;
    
    if (currentQuestion && timeLeft > 0 && !answerStatus) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !answerStatus) {
      // انتهاء الوقت
      handleTimeUp();
    }
    
    return () => clearInterval(timer);
  }, [currentQuestion, timeLeft, answerStatus]);
  
  // معالجة انتهاء الوقت
  const handleTimeUp = () => {
    if (currentQuestion) {
      setAnswerStatus('incorrect');
      // إرسال إجابة خاطئة بسبب انتهاء الوقت
      setTimeout(() => {
        answerQuestion(false, currentQuestion.teamNumber, username, null);
      }, 2000);
    }
  };
  
  // معالجة تقديم الإجابة
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    
    if (!currentQuestion || !userAnswer.trim()) return;
    
    // التحقق من صحة الإجابة (يمكن تحسين هذا المنطق)
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    // إرسال نتيجة الإجابة بعد فترة قصيرة لعرض النتيجة للمستخدم
    setTimeout(() => {
      answerQuestion(isCorrect, currentQuestion.teamNumber, username, null);
    }, 2000);
  };
  
  // إظهار التلميح
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  // تنسيق الوقت المتبقي
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  if (!currentQuestion) {
    return (
      <NoQuestionContainer>
        <NoQuestionMessage>لا يوجد سؤال حالي</NoQuestionMessage>
        <NoQuestionSubtext>انتظر حتى يقوم المضيف بتقديم سؤال جديد</NoQuestionSubtext>
      </NoQuestionContainer>
    );
  }
  
  return (
    <QuestionContainer status={answerStatus}>
      <QuestionHeader>
        <QuestionLetter>{currentQuestion.letter}</QuestionLetter>
        <QuestionTimer isLow={timeLeft < 10}>
          <FaHourglassHalf />
          <span>{formatTimeLeft()}</span>
        </QuestionTimer>
      </QuestionHeader>
      
      <QuestionContent>
        <QuestionText>{currentQuestion.question}</QuestionText>
        
        {currentQuestion.hint && (
          <HintSection>
            <HintButton onClick={toggleHint}>
              <FaLightbulb />
              <span>{showHint ? 'إخفاء التلميح' : 'إظهار التلميح'}</span>
            </HintButton>
            
            {showHint && (
              <HintText>{currentQuestion.hint}</HintText>
            )}
          </HintSection>
        )}
      </QuestionContent>
      
      {answerStatus ? (
        <AnswerResult status={answerStatus}>
          {answerStatus === 'correct' ? (
            <>
              <FaCheck />
              <span>إجابة صحيحة!</span>
            </>
          ) : (
            <>
              <FaTimes />
              <span>إجابة خاطئة!</span>
              <CorrectAnswerText>الإجابة الصحيحة: {currentQuestion.answer}</CorrectAnswerText>
            </>
          )}
        </AnswerResult>
      ) : (
        <AnswerForm onSubmit={handleSubmitAnswer}>
          <AnswerInput
            type="text"
            placeholder="اكتب إجابتك هنا..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            autoFocus
          />
          <SubmitButton type="submit">إرسال الإجابة</SubmitButton>
        </AnswerForm>
      )}
      
      <TeamIndicator team={currentQuestion.teamNumber}>
        دور {currentQuestion.teamNumber === 1 ? 'الفريق الأول' : 'الفريق الثاني'}
      </TeamIndicator>
    </QuestionContainer>
  );
};

const QuestionContainer = styled.div`
  background-color: ${props => 
    props.status === 'correct' ? 'rgba(46, 204, 113, 0.1)' : 
    props.status === 'incorrect' ? 'rgba(231, 76, 60, 0.1)' : 
    'var(--card-bg)'
  };
  border: 2px solid ${props => 
    props.status === 'correct' ? 'var(--button-success)' : 
    props.status === 'incorrect' ? 'var(--button-danger)' : 
    'var(--border-color)'
  };
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  transition: all var(--transition-speed);
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionLetter = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  background-color: var(--background-color);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
`;

const QuestionTimer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.isLow ? 'var(--button-danger)' : 'var(--text-color)'};
  animation: ${props => props.isLow ? 'pulse 1s infinite' : 'none'};
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const QuestionText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  line-height: 1.6;
`;

const HintSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
`;

const HintButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--border-color);
  }
  
  svg {
    color: var(--button-warning);
  }
`;

const HintText = styled.div`
  font-style: italic;
  color: var(--text-secondary);
  text-align: center;
  padding: var(--spacing-sm);
  background-color: var(--background-color);
  border-radius: var(--border-radius-sm);
  border: 1px dashed var(--border-color);
`;

const AnswerForm = styled.form`
  display: flex;
  gap: var(--spacing-sm);
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const AnswerInput = styled.input`
  flex: 1;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 1.1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  background-color: var(--button-primary);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
`;

const AnswerResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: ${props => 
    props.status === 'correct' ? 'rgba(46, 204, 113, 0.2)' : 
    'rgba(231, 76, 60, 0.2)'
  };
  color: ${props => 
    props.status === 'correct' ? 'var(--button-success)' : 
    'var(--button-danger)'
  };
  font-weight: 600;
  font-size: 1.2rem;
  
  svg {
    font-size: 2rem;
  }
`;

const CorrectAnswerText = styled.div`
  font-size: 1rem;
  color: var(--text-color);
  margin-top: var(--spacing-xs);
`;

const TeamIndicator = styled.div`
  align-self: center;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.team === 1 ? 'var(--team1-color)' : 'var(--team2-color)'};
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const NoQuestionContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const NoQuestionMessage = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
`;

const NoQuestionSubtext = styled.div`
  color: var(--text-secondary);
`;

export default QuestionDisplay;
