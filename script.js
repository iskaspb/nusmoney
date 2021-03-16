const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
//const text = document.getElementById('text');
//const amount = document.getElementById('amount');
const users = document.getElementById('users');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const userAccounts = [
  { id: '1', name:'Alex', accounts: [
    { bank:'DBS', deposit:25, loan:10 },
    { bank:'Citi', deposit:0, loan:5 },
    { bank:'HSBC', deposit:30, loan:0 }
  ]},
  { id: '2', name:'Mila', accounts: [
    { bank:'DBS', deposit:100, loan:0 },
    { bank:'UOB', deposit:5, loan:40 }
  ]}
];

function updateUserInfo(userInfo) {
  if(!userInfo)
  {
    console.log("WARNING: Undefined userInfo");
    return;
  }
  let listHTML = '';
  let deposit = 0, loan = 0, total = 0;
  userInfo.accounts.forEach((account) => {
    if(account.deposit !== 0) {
      deposit += account.deposit;
      listHTML += '<li class="plus">' + account.bank + '<span>+' + account.deposit + '</span></li>';
    }
    if(account.loan !== 0) {
      loan += account.loan;
      listHTML += '<li class="minus">' + account.bank + '<span>-' + account.loan + '</span></li>';
    }
  });
  deposit = deposit.toFixed(2);
  loan = loan.toFixed(2);
  total = deposit - loan;
  total = total.toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${deposit}`;
  money_minus.innerText = `$${loan}`;
  list.innerHTML = listHTML;
}

function selectUser() {
  updateUserInfo(userAccounts.find((elem) => { return users.value === elem.id; }));
}

function init() {
  userAccounts.forEach((userInfo) => {
      users.innerHTML += `<option value="${userInfo.id}">${userInfo.name}</option>`;
  });
  selectUser();
}

init();
users.addEventListener('change', selectUser)

/*
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
form.addEventListener('submit', addTransaction);
*/


