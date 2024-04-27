import React, { useCallback, useEffect, useState } from 'react';
import Question from '../components/question/Question';
import QuestionSelector from '../components/questionSelector/QuestionSelector';
import testData from '../tests/test.js';

const TestPage = () => {
  const [test, setTest] = useState('');
  const [result, setResult] = useState([]);
  const [score, setScore] = useState(0);

  const [showSelectorElements, setshowSelectorElements] = useState(true);
  const [showTestElements, setshowTestElements] = useState(false);

  useEffect(() => {
    setTest(testData);
  }, []);

  const saveResult = () => {
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    const result = Array.from(answers).map((answer) => answer.value);
    setResult(result);
    calculateScore(result); 
    return;
  };

  const calculateScore = (result) => {
    let score = 0;
    test.questions.forEach((question, index) => {
      if (question.answers.find((answer) => answer.answer === result[index] && answer.isCorrect)) {
        score++;
      }
    });
    setScore(score);
    console.log(score);
    return;
  };
  
  const startTest = () => {
    setshowSelectorElements(false);
    setshowTestElements(true);
    return;
  }

  return (
    <div>
      {showSelectorElements && <QuestionSelector test={test} setTest={setTest} />}
      {showSelectorElements && <button onClick={startTest}>Почати тест</button>}
      {showTestElements && <Question test={test} />}
      {showTestElements && <button onClick={saveResult}>Зберегти результат</button>}
      {showTestElements && <span>Ваш результат: {score}</span>}
    </div>
  );
};

export default TestPage;
