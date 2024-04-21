const testData = {
    testName: "Тест по WEB дизайну",
    questions: [
        {
            question: "Вкажіть тег для блоку?",
            answers: [
                {
                    answer: "a",
                    isCorrect: false,
                },
                {
                    answer: "div",
                    isCorrect: true,
                },
                {
                    answer: "img",
                    isCorrect: false,
                },
                {
                    answer: "p",
                    isCorrect: false,
                }
            ],
            is_selected: true,
        },
        {
            question: "Вкажіть тег для гіперпосилання?",
            answers: [
                {
                    answer: "a",
                    isCorrect: true,
                },
                {
                    answer: "div",
                    isCorrect: false,
                },
                {
                    answer: "span",
                    isCorrect: false,
                },
                {
                    answer: "p",
                    isCorrect: false,
                }
            ],
            is_selected: true,
        }
    ]
};

export default testData;
