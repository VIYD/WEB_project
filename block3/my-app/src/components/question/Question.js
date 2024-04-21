import React from 'react';

const Question = ({ test }) => {
  if (!test) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h3>{test.testName}</h3>
      {test.questions.map((question, index) => (
        <div key={index}>
          <h4>{question.question}</h4>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              //jsx expression must have one parent element
              <li key={answerIndex}>
                <input type="radio" name={question.question} value={answer.answer} />
                <label>{answer.answer}</label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Question;
