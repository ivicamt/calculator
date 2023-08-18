document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");
    const clearButton = document.getElementById("clear");
    const calculateButton = document.getElementById("calculate");

    let currentInput = "";
    let currentOperator = "";
    let prevInput = "";
    let isCalculated = false;

    numberButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (isCalculated) {
                clearDisplay();
                isCalculated = false;
            }
            currentInput += button.textContent;
            updateDisplay();
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (currentInput !== "") {
                if (prevInput !== "") {
                    prevInput = operate(prevInput, currentOperator, currentInput);
                    currentInput = "";
                } else {
                    prevInput = currentInput;
                    currentInput = "";
                }
                currentOperator = button.textContent;
                updateDisplay();
            }
        });
    });

    calculateButton.addEventListener("click", function() {
        if (currentInput !== "" && currentOperator !== "") {
            prevInput = operate(prevInput, currentOperator, currentInput);
            currentInput = prevInput;
            currentOperator = "";
            updateDisplay();
            isCalculated = true;
        }
    });

    clearButton.addEventListener("click", clearDisplay);

    function operate(num1, operator, num2) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 !== 0) {
                    return num1 / num2;
                } else {
                    return "Error";
                }
            default:
                return num2;
        }
    }

    function updateDisplay() {
        display.value = currentInput || prevInput || "0";
    }

    function clearDisplay() {
        currentInput = "";
        prevInput = "";
        currentOperator = "";
        updateDisplay();
    }
});