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
                    answer: "ul",
                    isCorrect: false,
                },
                //
                //Мені довелось змінити answer з div на ul, тому що відповідь div вже була в попередньому питанні,
                //логіка підрахунку правильних відповідей відбувається калічно, тому оскільки div у попередньому питанні
                //відмічена як правильна відповідь, то в цьому питанні вона теж врахувалась би як правильна відповідь.
                //
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
