document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submitButton');

    const testData = {
        testName: "Тест з загальних знань",
        questions: [
            {
                question: "Столиця України?",
                correctAnswer: "Київ",
                answers: [
                    {
                        answer: "Мадрид",
                    },
                    {
                        answer: "Київ",
                    },
                    {
                        answer: "Барселона",
                    },
                    {
                        answer: "Будапешт",
                    }
                ],
            },
            {
                question: "2 + 3 ?",
                correctAnswer: "5",
                answers: [
                    {
                        answer: "0",
                    },
                    {
                        answer: "7",
                    },
                    {
                        answer: "5",
                    },
                    {
                        answer: "1",
                    }
                ],
            },
            {
                question: "На скільки мегатонн за кожні 3 хвилини зменшується маса Сонця внаслідок випромінювання, якщо швидкість світла дорівнює 3⋅108 м/с, а загальна потужність випромінювання Сонця дорівнює 4⋅1026 Вт.",
                correctAnswer: "800 Мт",
                answers: [
                    {
                        answer: "800 Мт",
                    },
                    {
                        answer: "360 Мт",
                    },
                    {
                        answer: "600 Мт",
                    }
                ],
            }
        ]
    };

    function displayQuiz() {
        let output = '';
        testData.questions.forEach((question, index) => {
            output += `<div class="question">${index + 1}. ${question.question}</div>`;
            question.answers.forEach(answer => {
                output += `
                    <label>
                        <input type="radio" name="question${index}" value="${answer.answer}">
                        ${answer.answer}
                    </label><br>
                `;
            });
            output += '<br>';
        });
        quizContainer.innerHTML = output;
    }

    function calculateScore() {
        let score = 0;
        testData.questions.forEach((question, index) => {
            const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedAnswer) {
                if (selectedAnswer.value === question.correctAnswer) {
                    score++;
                }
            }
        });
        return score;
    }

    function displayResult(score) {
        let output = `Ваш результат: ${score} з ${testData.questions.length} балів<br><br>`;
        output += "<strong>Правильні відповіді:</strong><br>";
        testData.questions.forEach((question, index) => {
            output += `${index + 1}. ${question.question} - ${question.correctAnswer}<br>`;
        });
        resultContainer.innerHTML = output;
    }

    submitButton.addEventListener('click', function() {
        const score = calculateScore();
        displayResult(score);
    });

    displayQuiz();
});
