const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let operationInProgress = false;
let operator = '';
let firstNumber = '';
let secondNumber = '';

function calculate() {
    let result;
    const parsedFirstNumber = parseFloat(firstNumber);
    const parsedSecondNumber = parseFloat(secondNumber);

    switch (operator) {
        case '+':
            result = parsedFirstNumber + parsedSecondNumber;
            break;
        case '-':
            result = parsedFirstNumber - parsedSecondNumber;
            break;
        case '×':
            result = parsedFirstNumber * parsedSecondNumber;
            break;
        case '÷':
            result = parsedFirstNumber / parsedSecondNumber;
            break;
        case 'x^y':
            result = Math.pow(parsedFirstNumber, parsedSecondNumber);
            break;
        case '√':
            result = Math.sqrt(parsedSecondNumber);
            break;
        case '!':
            result = factorial(parsedFirstNumber);
            break;
    }

    if (!isNaN(result)) {
        display.innerText = result;
    } else {
        display.innerText = "Error";
    }

    operationInProgress = false;
    operator = '';
    firstNumber = result.toString();
    secondNumber = '';
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id === "clear") {
            display.innerText = "";
            operationInProgress = false;
            operator = '';
            firstNumber = '';
            secondNumber = '';
        } else if (item.id === "backspace") {
            display.innerText = display.innerText.slice(0, -1);
            if (!operationInProgress || operator) {
                secondNumber = display.innerText;
            } else {
                firstNumber = display.innerText;
            }
        } else if (item.id === "equal") {
            calculate();
        } else if (item.classList.contains("btn-operator")) {
            if (!operationInProgress) {
                operationInProgress = true;
                operator = item.id === "incitement" ? 'x^y' : item.id === "elementalization" ? '√' : item.id === "factorial" ? '!' : item.innerText;
                display.innerText += operator === 'x^y' ? '^' : operator;
            }
        } else {
            if (!operationInProgress) {
                firstNumber += item.innerText;
            } else {
                secondNumber += item.innerText;
            }
            display.innerText += item.innerText;
        }
    };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};