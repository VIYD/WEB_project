import React, { useCallback, useEffect, useState } from 'react';
import Question from '../components/question/Question';
import testData from '../tests/test.js';

const TestPage = () => {
  const [test, setTest] = useState('');
  const [result, setResult] = useState([]);
  const [score, setScore] = useState(0);


  const saveResult = () => {
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    const result = Array.from(answers).map((answer) => answer.value);
    setResult(result);
    console.log(result);
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
  };

  useEffect(() => {
    setTest(testData);
  }, []);

  useEffect(() => {
    calculateScore(result);
  }, [result]);


  return (
    <div>
      <Question test={test} />
      <button onClick={saveResult}>Зберегти результат</button>
    </div>
  );
};

export default TestPage;
