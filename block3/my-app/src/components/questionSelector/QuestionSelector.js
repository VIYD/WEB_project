import React from 'react';

const QuestionSelector = ({ test, setTest }) => {
  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{test.testName}</h3>
      {test.questions.map((question, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={question.is_selected}
            onChange={() => {
              const updatedQuestions = [...test.questions];
              updatedQuestions[index].is_selected = !question.is_selected;
              setTest({ ...test, questions: updatedQuestions });
            }}
          />
          <label>{question.question}</label>
        </div>
      ))}
    </div>
  );
};

export default QuestionSelector;
