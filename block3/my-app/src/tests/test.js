const testData = {
    testName: "Тест по WEB дизайну",
    questions: [
        {
            question: "Вкажіть тег для блоку?",
            answers: [
                {
                    answer: "li",
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
                    answer: "map",
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
