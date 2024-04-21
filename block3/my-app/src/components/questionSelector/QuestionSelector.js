import React from 'react';

const QuestionSelector = ({ test, handleSelection }) => {
  if (!test) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h3>{test.testName}</h3>
      {test.questions.map((question, index) => (
        <div key={index}>
          <h4>{question.question}</h4>
            <label>Вибрати питання?</label>
          <input
            type="checkbox"
            checked={question.is_selected}
            onChange={() => handleSelection(index)}
          />
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

export default QuestionSelector;