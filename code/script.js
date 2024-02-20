const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let operationInProgress = false;
let operator = '';
let firstNumber = '';
let secondNumber = '';

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
      operationInProgress = false;
      operator = '';
      firstNumber = '';
      secondNumber = '';
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
      if (!operationInProgress) {
        firstNumber = display.innerText;
      } else {
        secondNumber = display.innerText.replace(firstNumber + operator, '');
      }
    } else if (item.id == "equal") {
      if (operationInProgress) {
        secondNumber = display.innerText.replace(firstNumber + operator, '');
        let result;
        switch (operator) {
          case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
          case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
          case '*':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
          case '/':
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
          case 'x^y':
            result = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
          case '√':
            result = Math.sqrt(parseFloat(secondNumber));
            break;
          case '!':
            result = factorial(parseInt(firstNumber));
            break;
          default:
            result = "Error";
            break;
        }
        display.innerText = result;
        operationInProgress = false;
        operator = '';
        firstNumber = '';
        secondNumber = '';
      }
    } else if (item.classList.contains("btn-operator")) {
      if (!operationInProgress && item.id !== "incitement" && item.id !== "elementalization" && item.id !== "factorial") {
        operationInProgress = true;
        operator = item.innerText;
        firstNumber = display.innerText;
        display.innerText += operator;
      } else if (item.id === "incitement") {
        operationInProgress = true;
        operator = 'x^y';
        firstNumber = display.innerText;
        display.innerText += '^';
      } else if (item.id === "elementalization") {
        operationInProgress = true;
        operator = '√';
        firstNumber = '';
        secondNumber = display.innerText;
        display.innerText = '√';
      } else if (item.id === "factorial") {
        operationInProgress = true;
        operator = '!';
        firstNumber = display.innerText;
        display.innerText += '!';
      }
    } else {
      display.innerText += item.innerText;
      if (!operationInProgress || operator === '√') {
        secondNumber += item.innerText;
      } else {
        firstNumber += item.innerText;
      }
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
