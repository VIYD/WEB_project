import React, {useState} from 'react';

const Question = ({ test }) => {
  if (!test) {
    return <div>Loading...</div>;
  }

  const selectedQuestions = test.questions.filter(question => question.is_selected);

  return (
    <div>
      <h3>{test.testName}</h3>
      {selectedQuestions.map((question, index) => (
        <div key={index}>
          <h4>{question.question}</h4>
          <ul>
            {question.answers.map((answer, answerIndex) => (
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
