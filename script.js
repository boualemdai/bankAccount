
"use strict"

const currentDate = document.querySelector(".display-section > span");
const logIn = document.getElementById("log-in");
const userName = document.getElementById("user-name");
const passworld = document.getElementById("password");
const main = document.querySelector("main");
const loan = document.getElementById("loan");
const loanBtn = document.getElementById("loan-btn");
const solde = document.querySelector(".solde");
const tableau = document.querySelector(".display");
const logoutName = document.getElementById("pseudo");
const logoutPassword = document.getElementById("pin");
const logoutBtn = document.getElementById("log-out");
const transferTo = document.getElementById("transfer-to");
const transfer = document.getElementById("amount");
const transferBtn = document.getElementById("trnsfer-btn");
const iN = document.querySelector("#in>span");
const out = document.querySelector("#out>span");
const interest = document.querySelector("#interest>span");
const sort = document.getElementById("sort");
const chrono = document.querySelector(".chrono>span");
const greeting = document.querySelector("header>h2");

let myInterval;
let seconds;
let mins;
let sorted = false;

const usersPin = {
  mustapha: "22",
  amine: "11",
};

const mustaphaMap = new Map([
  ["01/08/2020", [1000, "$"]],
  ["25/03/2019", [3000, "$"]],
  ["16/08/2021", [-500, "$"]],
  ["04/10/2022", [2000, "$"]],
]);
const amineMap = new Map([
  ["01/08/2020", [2000, "$"]],
  ["25/03/2019", [6000, "$"]],
  ["16/08/2021", [-400, "$"]],
  ["04/10/2022", [-2000, "$"]],
]);

const usersMap = {
  mustapha: mustaphaMap,
  amine: amineMap,
};

const initialState = () => {
  logoutName.value = null;
  logoutPassword.value = null;
  solde.textContent = null;
  greeting.textContent = "Log in to get started";
  tableau.textContent = null;
  transferTo.value = null;
  transfer.value = null;
  loan.value = null;
  userName.value = null;
  passworld.value = null;
  clearInterval(myInterval);
  main.classList.add("hidden");
};
initialState();
//chrono

function chronofn() {
  if (mins !== 0) {
    if (seconds === 0) {
      mins--;
      seconds = 59;
    } else seconds--;
  } else if (seconds !== 0) {
    seconds--;
  } else {
    initialState();
  }
  chrono.textContent = `${mins > 9 ? mins : "0" + mins}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
}

// get time local format

function getTime() {
  return new Date().toLocaleDateString("FR-fr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}
// display

function soldefn(val, user, date, cur = "$") {
  solde.textContent = (Number(solde.textContent) + val).toFixed(2);

  const html = `
    <div class="exemple">
        <p class=${val > 0 ? "dep" : "wit"}>${
    val > 0 ? `Deposit` : `Withdrew`
  }</p>
        <p>${date.slice(0, 10)}</p>
        <p >${val}</p>
        <p >${cur}</p>
            </div>
                    `;
  tableau.insertAdjacentHTML("afterbegin", html);
  let newArr = [];
  usersMap[user].forEach(([val, cur], date) => {
    newArr.push(val);
  });
  newArr = newArr.reduce(
    ([positive, neagative], val) => {
      val > 0 ? (positive += val) : (neagative += val);
      return [positive, neagative];
    },
    [0, 0]
  );

  iN.textContent = newArr[0];
  out.textContent = newArr[1];
  interest.textContent = (newArr[0] * 0.01).toFixed(2);
}

// map relevet

function relevet(user) {
  tableau.innerHTML = null;
  solde.textContent = null;

  usersMap[user].forEach(([val, cur], date) => {
    soldefn(val, user, date, cur);
  });

  main.classList.remove("hidden");

  mins = 10;
  seconds = 0;
  clearInterval(myInterval);
  myInterval = setInterval(chronofn, 1000);
}

//check user

function checkeUser(user, pin) {
  for (const [key, value] of Object.entries(usersPin)) {
    if (user === key && pin === value) {
      relevet(key);
    }
  }
}

//log in

logIn.addEventListener("click", () => {
  checkeUser(userName.value, passworld.value);
  greeting.textContent = `Hello Mr: ${userName.value}`;
});

// transfer

transferBtn.addEventListener("click", () => {
  mins = 10;
  seconds = 0;
  clearInterval(myInterval);
  myInterval = setInterval(chronofn, 1000);
  const transferValue = Number(transfer.value);
  const time = getTime();
  usersMap[userName.value].set(time, [-transferValue, "$"]);
  usersMap[transferTo.value].set(time, [transferValue, "$"]);
  setTimeout(() => {
    soldefn(-transferValue, userName.value, time);
  }, 3000);

  transfer.value = null;
  transferTo.value = null;
});

//loan

loanBtn.addEventListener("click", () => {
  const loanValue = Number(loan.value);
  const time = getTime();
  usersMap[userName.value].set(time, [loanValue, "$"]);
  setTimeout(() => {
    soldefn(loanValue, userName.value, time);
  }, 3000);

  loan.value = null;
});

// log out

logoutBtn.addEventListener("click", () => {
  if (
    logoutName.value === userName.value &&
    logoutPassword.value === passworld.value
  ) {
    initialState();
  }
});

//sort

sort.addEventListener("click", () => {
  tableau.innerHTML = null;
  console.log(usersMap[userName.value]);
  if (!sorted) {
    //----
    let sortedMap = [];
    sortedMap = [...usersMap[userName.value]];
    sortedMap = sortedMap
      .sort(([date, [a, cur]], [dat, [b, cu]]) => b - a)
      .map(
        ([date, [val, cur]]) =>
          (tableau.innerHTML += `
    <div class="exemple">
        <p class=${val > 0 ? "dep" : "wit"}>${
            val > 0 ? "Deposit" : "Withdrew"
          }</p>
        <p>${date.slice(0, 10)}</p>
        <p>${val}</p>
        <p>${cur}</p>
            </div>
                    `)
      );
    //---------
    sorted = true;
  } else {
    [...usersMap[userName.value]].map(([date, [val, cur]],i) => {
      const html = `
  <div class="exemple">
      <p class=${val > 0 ? "dep" : "wit"}>${
        val > 0 ? `Deposit` : `Withdrew`
      }</p>
      <p>${date.slice(0, 10)}</p>
      <p >${val}</p>
      <p>${cur}</p>
          </div>
                  `;
      tableau.insertAdjacentHTML("afterbegin", html);
    });
    sorted = false;
  }
});

setInterval(() => {
  currentDate.textContent = getTime();
}, 1000);


