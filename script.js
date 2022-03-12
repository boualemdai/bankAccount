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
console.log(chrono);
let seconds = 0;
let mins = 3;

const initialArr = [1000, 5000, 5000, -800, -1200, -1000];
const arr = [];
let sorted = false;
initialArr.map((e) => soldefn(e));

function soldefn(val) {
  arr.push(val);
  solde.textContent = (Number(solde.textContent) + val).toFixed(2);
  tableau.innerHTML += `
            <div class="exemple">
                <p>${val > 0 ? "Deposit" : "Withdrew"}</p>
                <p>${new Date().toLocaleDateString("FR-fr")}</p>
                <p>${val}</p>
            </div>
                    `;
  const newArr = arr.reduce(
    ([positive, neagative], val) => {
      val > 0 ? (positive += val) : (neagative += val);
      return [positive, neagative];
    },
    [0, 0]
  );
  iN.textContent = newArr[0];
  out.textContent = newArr[1];
  interest.textContent = newArr[0] * 0.01;
}
const chronofn = () => {
  if (mins !== 0) {
    if (seconds === 0) {
      mins--;
      seconds = 59;
    } else seconds--;
  } else if (seconds !== 0) {
    seconds--;
  } else {
    main.classList.add("hidden");
  }
  chrono.textContent = `${mins > 9 ? mins : "0" + mins}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
};

currentDate.textContent = new Date().toLocaleDateString("FR-fr");
logIn.addEventListener("click", () => {
  if (userName.value === "boualem" && passworld.value === "123") {
    main.classList.remove("hidden");

    mins = 10;
    seconds = 0;
    setInterval(chronofn, 1000);
  }
});
loanBtn.addEventListener("click", () => {
  const loanValue = Number(loan.value);
  soldefn(loanValue);
});
logoutBtn.addEventListener("click", () => {
  if (logoutName.value === "boualem" && logoutPassword.value === "123") {
    main.classList.add("hidden");
  }
  logoutName.value = null;
  logoutPassword.value = null;
});

transferBtn.addEventListener("click", () => {
  const transferValue = Number(transfer.value);
  soldefn(-transferValue, "Withdrew");
});
sort.addEventListener("click", () => {
  tableau.innerHTML = null;
  console.log(sorted);
  if (!sorted) {
    let sortedArr = [...arr];

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
    arr.map((e) => {
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
