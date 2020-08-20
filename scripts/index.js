'use strict';

const input = document.querySelector("#input"), //input/output button
    numbers = document.querySelectorAll(".number"), // number buttons
    operators = document.querySelectorAll(".operator"), // operator buttons
    result = document.querySelector("#result"), // equal button
    clear = document.querySelector("#clear"); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

let numberOperatorsArray = [];

numbers.forEach(function (number) {
    number.addEventListener("click", function () {
        input.innerHTML += this.innerHTML;
        numberOperatorsArray = [...numberOperatorsArray, this.innerHTML];
    });
});

operators.forEach(function (operator) {
    operator.addEventListener("click", function () {
        input.innerHTML += this.innerHTML;
        numberOperatorsArray = [...numberOperatorsArray, this.innerHTML];
    });
});

// on click of 'equal' button
result.addEventListener("click", function(){
    //do math here
    let numberStringHolder = "";
    let resultArray = [];
    for(let char of numberOperatorsArray) {
        const numReg = /\d/;
        if (numReg.test(char) || char === '.') {
            numberStringHolder += char;

        } else {
            resultArray = [...resultArray, Number(numberStringHolder), char]
            numberStringHolder = "";
        }
    }
    resultArray = [...resultArray, Number(numberStringHolder)];
    
    let multiply = resultArray.indexOf("*");
    while (multiply !== -1) {
        resultArray.splice(multiply -1, 3, resultArray[multiply - 1] * resultArray[multiply + 1]);
        multiply = resultArray.indexOf("*");
    }

    let divide = resultArray.indexOf("/");
    while (divide !== -1) {
        resultArray.splice(divide -1, 3, resultArray[divide - 1] / resultArray[divide + 1]);
        divide = resultArray.indexOf("/");
    }

    let add = resultArray.indexOf("+");
    while (add !== -1) {
        resultArray.splice(add - 1, 3, resultArray[add - 1] + resultArray[add + 1]);
        add = resultArray.indexOf("+");
    }

    let subtract = resultArray.indexOf("-");
    while (subtract !== -1) {
        resultArray.splice(subtract - 1, 3, resultArray[subtract - 1] - resultArray[subtract + 1]);
        subtract = resultArray.indexOf("-");
    }

    numberOperatorsArray = [...resultArray];
    input.innerHTML = resultArray;
});

//clearing the input on press of clear
clear.addEventListener("click", function() {
    numberOperatorsArray = [];
    input.innerHTML = "";
});


// <button type="button" class="operator" value="*">&times;</button>
/* <button type="button" class="operator" value="/">&divide;</button>
If you added values in your html, you can add the symbols without changing js. */