let surveys = JSON.parse(localStorage.getItem('surveys')) || [];

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Попередити відправку форми

    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    formObject['name'] = document.getElementById('name').value;

    surveys.push(formObject);
    localStorage.setItem('surveys', JSON.stringify(surveys));

    alert('Дані опитування успішно збережені!');
});
