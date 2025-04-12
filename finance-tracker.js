
let totalIncome = 0;
let totalExpense = 0;
let categories = {
    'Зарплата': 0,
    'Продукты': 0,
    'Транспорт': 0,
    'Развлечения': 0,
    'Жильё': 0
};

let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

function saveTransaction() {
    const income = parseFloat(document.getElementById('income').value);
    const expense = parseFloat(document.getElementById('expense').value);
    const mandatoryExpenses = parseFloat(document.getElementById('mandatory-expenses').value) || 0;
    const category = document.getElementById('category').value;
    const currency = document.getElementById('currency').value;

    if (isNaN(income) || isNaN(expense)) {
        alert("Пожалуйста, введите корректные данные.");
        return;
    }

    totalIncome += income;
    totalExpense += expense;
    categories[category] += income - expense;

    const transaction = {
        date: new Date().toLocaleDateString(),
        income: income,
        expense: expense,
        category: category,
        currency: currency
    };

    transactionHistory.push(transaction);
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

    
    addTransaction(transaction);

   
    updateForecast();

    
    updateRemainingIncome(mandatoryExpenses);

    
    updateChart();

    
    document.getElementById('income').value = '';
    document.getElementById('expense').value = '';
}


function addTransaction(transaction) {
    const transactionList = document.getElementById('transaction-list');
    const transactionItem = document.createElement('li');
    transactionItem.innerText = `${transaction.date}: ${transaction.category} — Доход: ${transaction.income}₸, Расход: ${transaction.expense}₸`;
    transactionList.appendChild(transactionItem);
}
function updateForecast() {
    let forecastIncome = totalIncome * 1.1;
    let forecastExpense = totalExpense * 1.05; 
    document.getElementById('forecast-income').innerText = `Прогнозируемый доход: ${forecastIncome}₸`;
    document.getElementById('forecast-expense').innerText = `Прогнозируемый расход: ${forecastExpense}₸`;
}

function updateRemainingIncome(mandatoryExpenses) {
    const remainingIncome = totalIncome - mandatoryExpenses - totalExpense;
    document.getElementById('remaining-income').innerText = `Оставшийся доход: ${remainingIncome}₸`;

    
    if (remainingIncome < 0) {
        document.getElementById('notifications').innerHTML = '<div class="notification">Предупреждение: Ваши расходы превышают доходы!</div>';
    } else {
        document.getElementById('notifications').innerHTML = '';
    }
}

function loadTransactionHistory() {
    if (transactionHistory.length > 0) {
        transactionHistory.forEach(transaction => {
            addTransaction(transaction);
        });
    }
}

function initChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    window.expenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Доходы', 'Расходы'],
            datasets: [{
                label: 'Финансовые данные',
                data: [totalIncome, totalExpense],
                backgroundColor: ['green', 'red']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }}); 
}


function updateChart() {
    if (window.expenseChart) {
        window.expenseChart.data.datasets[0].data = [totalIncome, totalExpense];
        window.expenseChart.update();
    }
}



