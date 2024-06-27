document.addEventListener('DOMContentLoaded', function() {
    initializeCriteriaInputs();
});

document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // захищає від перезапуску сторінки при натисканні на кнопку

    const selectedCriteria = getSelectedCriteria();

    // виклик функції фільтрації з критеріями
    const filteredData = filterSurveyData(selectedCriteria);

    // відображення відфільтрованих результатів
    const filteredResultsDiv = document.getElementById('filteredResults');
    filteredResultsDiv.innerHTML = ''; // Очистити попередні результати
    if (filteredData.length === 0) {
        filteredResultsDiv.textContent = 'Не знайдено відповідних результатів.';
    } else {
        filteredData.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.textContent = JSON.stringify(result);
            filteredResultsDiv.appendChild(resultElement);
        });
    }
});

//
// фільтрація
//
function filterSurveyData(criteria) {
    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];

    // фільтрація опитувань за критеріями
    const filteredSurveys = surveys.filter(survey => {
        for (const key in criteria) {
            if (criteria[key] && survey[key] !== criteria[key]) {
                console.log(criteria[key] + survey[key] + criteria[key]);
                return false;
            }
        }
        return true;
    });

    return filteredSurveys;
}

//
// функція витягнення обраних критеріїв з чекбоксів
//
function getSelectedCriteria() {
    const selectedCriteria = {};
    const checkboxes = document.querySelectorAll('input[name="filterCriteria"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const criteriaName = checkbox.value;
            selectedCriteria[criteriaName] = document.getElementById(`selected${criteriaName.charAt(0).toUpperCase() + criteriaName.slice(1)}`).value;
        }
    });
    
    return selectedCriteria;
}

//
// функція ініціалізації вхідних критеріїв
//
function initializeCriteriaInputs() {
    const criteriaInputsDiv = document.getElementById('criteriaInputs');
    const criteriaOptions = ['факультет', 'потік', 'зручний час', 'середній бал'];
    criteriaOptions.forEach(criteria => {
        const inputLabel = document.createElement('label');
        inputLabel.textContent = `Оберіть ${criteria.charAt(0).toUpperCase() + criteria.slice(1)}:`;
        inputLabel.setAttribute('for', `selected${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`); // встановлення атрибуту for
        inputLabel.style.opacity = '50%';
        inputLabel.style.paddingTop = '10px';
        inputLabel.style.display = 'inline-block';
        inputLabel.style.marginRight = '15px';
        let inputElement;
        if (criteria === 'факультет' || criteria === 'потік') {
            inputElement = document.createElement('select');
            inputElement.id = `selected${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`;
            inputElement.name = `selected${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`;
            inputElement.style.opacity = '50%';
            //
            // додавання варіантів для факультету чи потоку
            //
            if (criteria === 'факультет') {
                ['електроніки', 'прикладної математики', 'інший'].forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.toLowerCase();
                    optionElement.textContent = option;
                    inputElement.appendChild(optionElement);
                });
            } else { // потік
                ['КН', 'ІПЗ', 'СА'].forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.textContent = option;
                    inputElement.appendChild(optionElement);
                });
            }
        } else { // зручний час чи середній бал
            inputElement = document.createElement('input');
            inputElement.type = criteria === 'зручний час' ? 'datetime-local' : 'text';
            inputElement.id = `selected${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`;
            inputElement.name = `selected${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`;
            inputElement.style.opacity = '50%';
        }
        criteriaInputsDiv.appendChild(inputLabel);
        criteriaInputsDiv.appendChild(inputElement);
        criteriaInputsDiv.appendChild(document.createElement('br'));
    });
}

//
// подія, ховає або відображає лейбли та інпути 
//
document.querySelectorAll('input[name="filterCriteria"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const criteriaName = this.value;
        const inputElement = document.getElementById(`selected${criteriaName.charAt(0).toUpperCase() + criteriaName.slice(1)}`);
        const inputLabel = document.querySelector(`label[for="selected${criteriaName.charAt(0).toUpperCase() + criteriaName.slice(1)}"]`);
        if (this.checked) {
            inputElement.style.opacity = '100%';
            inputLabel.style.opacity = '100%';
        } else {
            inputElement.style.opacity = '50%';
            inputLabel.style.opacity = '50%';
        }
    });
});
