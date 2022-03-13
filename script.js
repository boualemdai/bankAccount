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

let seconds;
let mins;
let sorted = false;

const userObj = {
  boualem: "123",
  mouloud: "456",
};
const obj = {
  boualem: [1000, 5000, 5000, -800, -1200, -1000],
  mouloud: [-2000, 5500, 6220, -950, 3000, -478],
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
  main.classList.add("hidden");
};
initialState();

//check user

function checkeUser(user, pin) {
  for (const [key, value] of Object.entries(userObj)) {
    console.log(key);
    if (user === key && pin === value) {
      relevet(key);
    }
  }
}

// map relevet

function relevet(user) {
  tableau.innerHTML = null;
  solde.textContent = null;
  obj[user].map((e) => soldefn(e, user));
  main.classList.remove("hidden");

  mins = 10;
  seconds = 0;
  setInterval(chronofn, 1000);
}

// display

function soldefn(val, user) {
  solde.textContent = (Number(solde.textContent) + val).toFixed(2);

  tableau.innerHTML += `
            <div class="exemple">
                <p>${val > 0 ? "Deposit" : "Withdrew"}</p>
                <p>${new Date().toLocaleDateString("FR-fr")}</p>
                <p>${val}</p>
            </div>
                    `;
  let newArr = [];

  newArr = obj[user].reduce(
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

//chrono

const chronofn = () => {
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
};

//log in

logIn.addEventListener("click", () => {
  checkeUser(userName.value, passworld.value);
  greeting.textContent = `Hello Mr: ${userName.value}`;
});

//loan

loanBtn.addEventListener("click", () => {
  const loanValue = Number(loan.value);
  obj[userName.value].push(loanValue);
  soldefn(loanValue, userName.value);
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

// transfer

transferBtn.addEventListener("click", () => {
  const transferValue = Number(transfer.value);
  obj[userName.value].push(-transferValue);
  obj[transferTo.value].push(transferValue);
  soldefn(-transferValue, userName.value);
  transfer.value = null;
  transferTo.value = null;
});

//sort

sort.addEventListener("click", () => {
  tableau.innerHTML = null;
  console.log(sorted);
  if (!sorted) {
    let sortedArr = [...obj[userName.value]];

    sortedArr
      .sort((a, b) => b - a)
      .map((e) => {
        tableau.innerHTML += `
            <div class="exemple">
                <p>${e > 0 ? "Deposit" : "Withdrew"}</p>
                <p>${new Date().toLocaleDateString("FR-fr")}</p>
                <p>${e}</p>
            </div>
                    `;
      });
    sorted = true;
  } else {
    obj[userName.value].map((e) => {
      tableau.innerHTML += `
          <div class="exemple">
              <p>${e > 0 ? "Deposit" : "Withdrew"}</p>
              <p>${new Date().toLocaleDateString("FR-fr")}</p>
              <p>${e}</p>
          </div>
                  `;
    });
    sorted = false;
  }
});

currentDate.textContent = new Date().toLocaleDateString("FR-fr");
