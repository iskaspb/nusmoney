const balance = document.getElementById('balance');
const list = document.getElementById('list');
const form = document.getElementById('form');
const users = document.getElementById('users');
const balanceChart = document.getElementById('balance-chart');

const userAccounts = [
  { id: '1', name:'Alex', accounts: [
    { bank:'DBS', deposit:25, loan:10 },
    { bank:'Citi', deposit:0, loan:5 },
    { bank:'HSBC', deposit:30, loan:0 }
  ]},
  { id: '2', name:'Mila', accounts: [
    { bank:'DBS', deposit:100, loan:0 },
    { bank:'UOB', deposit:5, loan:40 }
  ]},
  { id: '3', name:'Luke', accounts: [
    { bank:'DBS', deposit:0, loan:80 },
    { bank:'ICBC', deposit:20, loan:55 },
    { bank:'Maybank', deposit:110, loan:80 },
    { bank:'SCB', deposit:10, loan:20 },
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
  drawBalanceChart(deposit, loan);
  list.innerHTML = listHTML;
}

function selectUser() {
  updateUserInfo(userAccounts.find((elem) => { return users.value === elem.id; }));
}

function drawBalanceChart(deposit, loan) {
  const height = 200, width = 350, xmargin = 40, textSpacing = 20;

  balanceChart.innerHTML = '';
  deposit = parseFloat(deposit);
  loan = parseFloat(loan);

  let svg = d3.select("#balance-chart")
    .append('svg')
    .attr("width", width)
    .attr("height", height);

  if(deposit || loan)
  {
    let dh, lh;
    if(deposit > loan)
    {
      dh = height;
      lh = loan * height / deposit;
    }
    else
    {
      lh = height;
      dh = deposit * height / loan;
    }

    const bars = [
      {
        x: 1.5 * xmargin,
        y: height - dh,
        height: dh,
        width: width / 2 - 2 * xmargin,
        collor: "#2ecc71"
      },
      {
        x: width / 2 + 0.5 * xmargin,
        y: height - lh,
        height: lh,
        width: width / 2 - 2 * xmargin,
        collor: "#c0392b"
      }
    ];

    svg.selectAll("rect")
      .data(bars)
      .enter().append("rect")
      .attr("x", bar => bar.x)
      .attr("y", bar => bar.y )
      .attr("fill", bar => bar.collor)
      .attr("height", bar => bar.height + "px")
      .attr("width", bar => bar.width);
  }

  const labels = [
    {
      x: width/4 + 0.5 * xmargin,
      y: height - textSpacing * 2,
      text: "DEPOSIT"
    },
    {
      x: width/4 + 0.5 * xmargin,
      y: height - textSpacing,
      text: "$" + deposit
    },
    {
      x: 3 * width / 4 - 0.5 * xmargin,
      y: height - textSpacing * 2,
      text: "LOAN"
    },
    {
      x: 3 * width / 4 - 0.5 * xmargin,
      y: height - textSpacing,
      text: "$" + loan
    }
  ];


  svg.selectAll("text")
    .data(labels)
    .enter().append("text")
    .attr("x", label => label.x)
    .attr("y", label => label.y)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .text(label => label.text);
}

function init() {
  userAccounts.forEach((userInfo) => {
      users.innerHTML += `<option value="${userInfo.id}">${userInfo.name}</option>`;
  });
  selectUser();
}

init();
users.addEventListener('change', selectUser)


