
// Get calculator display

var display = document.getElementById("result");

// Calculator variables

var firstNumber = "";
var secondNumber = "";
var operator = "";
var newNumber = false;


// Calculator button function

function calculate(value) {

    // Clear button

    if (value == "C") {

        firstNumber = "";
        secondNumber = "";
        operator = "";
        display.value = "0";

    }

    // Delete button

    else if (value == "DEL") {

        if (newNumber) {
            return;
        }

        if (secondNumber != "") {
            secondNumber = secondNumber.slice(0, -1);
            display.value = secondNumber || "0";
        }

        else if (operator == "") {
            firstNumber = firstNumber.slice(0, -1);
            display.value = firstNumber || "0";
        }

    }

    // Percentage button

    else if (value == "%") {

        var number;

        if (operator == "") {
            number = Number(firstNumber);
            firstNumber = String(number / 100);
            display.value = firstNumber;
        }

        else if (secondNumber != "") {
            number = Number(secondNumber);
            secondNumber = String(number / 100);
            display.value = secondNumber;
        }

    }

    // Equal button

    else if (value == "=") {

        if (firstNumber == "" || secondNumber == "" || operator == "") {
            return;
        }

        var a = Number(firstNumber);
        var b = Number(secondNumber);
        var answer;

        if (operator == "+") {
            answer = a + b;
        }

        else if (operator == "-") {
            answer = a - b;
        }

        else if (operator == "*") {
            answer = a * b;
        }

        else if (operator == "/") {

            if (b == 0) {
                display.value = "Cannot divide by zero";
                firstNumber = "";
                secondNumber = "";
                operator = "";
                newNumber = true;
                return;
            }

            answer = a / b;
        }

        display.value = Number(answer.toFixed(8));

        firstNumber = display.value;
        secondNumber = "";
        operator = "";
        newNumber = true;

    }

    // Operator buttons

    else if (value == "+" || value == "-" ||
             value == "*" || value == "/") {

        if (firstNumber == "" || firstNumber == ".") {
            return;
        }

        if (secondNumber != "" && operator != "") {
            calculate("=");
        }

        operator = value;
        newNumber = false;

    }

    // Number and decimal buttons

    else {

        if (newNumber) {

            firstNumber = "";
            secondNumber = "";
            operator = "";
            newNumber = false;

        }

        if (operator == "") {

            if (value == "." && firstNumber.includes(".")) {
                return;
            }

            firstNumber = firstNumber + value;
            display.value = firstNumber;

        }

        else {

            if (value == "." && secondNumber.includes(".")) {
                return;
            }

            secondNumber = secondNumber + value;
            display.value = secondNumber;

        }

    }

}


// Make calculator buttons clickable

var calculatorButtons = document.querySelectorAll(".buttons button");

calculatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        var value = button.getAttribute("data-value");

        calculate(value);

    });

});


// Theme buttons

var themeButtons = document.querySelectorAll(".theme-options button");

function changeTheme(theme) {

    document.body.className = theme;

    localStorage.setItem("selectedTheme", theme);

    themeButtons.forEach(function(button) {

        button.classList.remove("selected");

        if (button.getAttribute("data-theme") == theme) {
            button.classList.add("selected");
        }

    });

}


// Load previously selected theme

var savedTheme = localStorage.getItem("selectedTheme");

if (savedTheme == "green" || savedTheme == "blue" ||
    savedTheme == "purple") {

    changeTheme(savedTheme);

}

else {

    changeTheme("green");

}


// Change theme on button click

themeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        var theme = button.getAttribute("data-theme");

        changeTheme(theme);

    });

});
