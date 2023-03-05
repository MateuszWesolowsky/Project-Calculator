let currentNumber = document.querySelector(".currentNumber");

let previousNumber = document.querySelector(".previousNumber p");

const mathSign = document.querySelector(".mathSign");

const numbersButtons = document.querySelectorAll(".number");

const operatorsButtons = document.querySelectorAll(".operator");

const equalButton = document.querySelector(".equals");

const clearButton = document.querySelector(".clear");

const calculatorHistory = document.querySelector(".history");

const historyBtn = document.querySelector(".history-btn");

const clearOne = document.querySelector(".clearOne");

let result;

const displayNumbers = function () {
	if (this.textContent === "." && currentNumber.innerHTML.includes(".")) return;

	if (this.textContent === "." && currentNumber.innerHTML === "0")
		return (currentNumber.innerHTML = "0.");

	if (this.textContent === "0" && currentNumber.innerHTML === "0") return;

	if (this.textContent === "00" && currentNumber.innerHTML === "0") return;

	if (currentNumber.innerHTML === "0")
		return (currentNumber.textContent = this.textContent);

	if (
		previousNumber.innerHTML &&
		mathSign.innerHTML && 
		currentNumber.innerHTML === '' &&
		this.textContent === "."
	)
		return (currentNumber.textContent = "0.");

	currentNumber.innerHTML += this.textContent;
};

const operate = function () {
	if (currentNumber.innerHTML === "0" && this.textContent === "-")
		return (currentNumber.innerHTML = "-");

	if (currentNumber.innerHTML === '0' && this.textContent !== '-') {
		 previousNumber.innerHTML = '0';
		 mathSign.innerHTML = this.innerHTML;
		 currentNumber.innerHTML = ''
	}
	if (previousNumber.innerHTML === "" && currentNumber.innerHTML === "-")
		return;

	if (currentNumber.innerHTML === "" && mathSign.innerHTML)
		return (mathSign.innerHTML = this.textContent);

	if (currentNumber.innerHTML === "0" && this.textContent !== "-") return;

	if (mathSign.innerHTML) {
		showResult();
	}

	previousNumber.innerHTML = currentNumber.innerHTML;
	currentNumber.innerHTML = "";
	mathSign.innerHTML = this.innerHTML;
};

const clearScreen = function () {
	mathSign.innerHTML = "";
	currentNumber.innerHTML = "0";
	previousNumber.innerHTML = "";
};

const showResult = function () {
	if (!previousNumber.innerHTML || !currentNumber.innerHTML) return;

	if (
		previousNumber.textContent &&
		mathSign.textContent === ":" &&
		currentNumber.textContent == false
	)
		return (currentNumber.textContent = "Nie można dzielić przez zero");

	if (currentNumber.textContent === "Nie można dzielić przez zero") {
		return clearScreen();
	}

	let a = Number(currentNumber.innerHTML);
	let b = Number(previousNumber.innerHTML);
	let operator = mathSign.innerHTML;

	switch (operator) {
		case "+":
			result = a + b;
			break;

		case "-":
			result = b - a;
			break;

		case ":":
			result = b / a;
			break;

		case "x":
			result = a * b;
			break;
	}
	addToHistory();
	currentNumber.innerHTML = result;
	previousNumber.innerHTML = "";
	mathSign.innerHTML = "";
	historyBtn.classList.add("active");
};

function addToHistory() {
	const historyEl = document.createElement("li");
	historyEl.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
	historyEl.classList.add("history-item");
	calculatorHistory.appendChild(historyEl);
}

const clearHistory = function () {
	document.querySelector("ul").textContent = "";
	historyBtn.classList.remove("active");
};

const clearOneInt = function () {
	if (currentNumber.innerHTML === "0") return;
	currentNumber.innerHTML = currentNumber.innerHTML.toString().slice(0, -1);
	if (currentNumber.innerHTML === "") return (currentNumber.innerHTML = "0");
};

// Nasłuchiwnaie przycisków
operatorsButtons.forEach((btn) => btn.addEventListener("click", operate));
equalButton.addEventListener("click", showResult);
clearButton.addEventListener("click", clearScreen);
numbersButtons.forEach((btn) => btn.addEventListener("click", displayNumbers));
historyBtn.addEventListener("click", clearHistory);
clearOne.addEventListener("click", clearOneInt);
