const displayText = document.querySelector('#display');
let firstNum = '';
let secondNum = '';
let firstOperator = '';
let result = 0;
let firstDecimal = '';
let lastUsed = '';
let isFirstDecimal = false;
let isSecondDecimal = false;



function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(event) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    if (firstOperator === '' || firstNum === '' || secondNum === '') {  
        firstNum =  '';
        secondNum = '';
       return;
    } else if (firstOperator === 'add') {
       result = add(firstNum, secondNum);
    } else if (firstOperator === 'subtract') {
        result = subtract(firstNum, secondNum);
    } else if (firstOperator === 'multiply') {
        result = multiply(firstNum, secondNum);
    } else if (firstOperator === 'divide' && secondNum !== 0) {
        result = divide(firstNum, secondNum);
    } else if (firstOperator === 'divide' && secondNum === 0) {
        result = 'Cannot Divide By Zero';
    }

    if (typeof(result) === 'number' || result === 'Cannot Divide By Zero') {
        displayText.textContent = result;
        firstNum = result;
        secondNum = '';
        firstOperator = '';
    } 
};

function clear() {
    displayText.textContent = 0;
    result = 0;
    firstNum = '';
    secondNum = '';
    firstOperator = '';
    newfirstNum = 0;
    newSecondNum = 0;
    firstDecimal = '';
    isFirstDecimal = false;
    isSecondDecimal = false;
}

function populateNumbers(event) {
    if (firstNum === '' && firstOperator === '') {
        firstNum = event.target.id;
        displayText.textContent = firstNum;
        lastUsed = 'firstNum';
    }  else if (firstNum !== '' && firstOperator === '') {
        newFirstNum = event.target.id;
        firstNum = firstNum + newFirstNum;
        displayText.textContent = firstNum;
        lastUsed = 'firstNum';
    }  else if (secondNum === '' && firstOperator !== '') {
        secondNum = event.target.id;
        displayText.textContent = secondNum;
        lastUsed = 'secondNum';
    }  else if (secondNum !== '' && firstOperator !== '') {
        newSecondNum = event.target.id;
        secondNum = secondNum + newSecondNum;
        displayText.textContent = secondNum;
        lastUsed = 'secondNum';
    }

}

function populateOperator(event) {
        if (firstOperator === '') {
            firstOperator = event.target.id;
        } else if (firstOperator !== '') {
            operate(event);
            firstOperator = event.target.id;
        }   
    };

function populateDecimal(event) {
    if (lastUsed === 'firstNum' && isFirstDecimal === false) {
        firstDecimal = event.target.id;
        firstNum = firstNum + firstDecimal;
        displayText.textContent = firstNum;
        isfirstDecimal = true;
    } else if (lastUsed === 'secondNum' && isSecondDecimal === false)
     {
        firstDecimal = event.target.id;
        secondNum = secondNum + firstDecimal;
        displayText.textContent = secondNum;
        isSecondDecimal = true;
    } else  {
        return;
    }
};

function backspace(event) {
    if (lastUsed === 'firstNum') {
        oldValue = displayText.textContent;
        newValue = oldValue.slice(0, -1);
        firstNum = newValue;
        displayText.textContent = newValue;
    } else if (lastUsed === 'secondNum') {
        oldValue = displayText.textContent;
        newValue = oldValue.slice(0, -1);
        secondNum = newValue;
        displayText.textContent = newValue;
    }
};


function updateSign(event) {
    if (lastUsed === 'firstNum') {
        firstNum = firstNum * -1;
        displayText.textContent = firstNum;
    } else if (lastUsed === 'secondNum') {
       secondNum = secondNum * -1;
       displayText.textContent = secondNum;
    }
};

function percentage(event) {
    if (lastUsed === 'firstNum' && parseFloat(firstNum) !== 0) {
        firstNum = parseFloat(firstNum) / 100;
        displayText.textContent = firstNum;
    } else if (lastUsed === 'secondNum' && parseFloat(secondNum) !== 0) {
       secondNum = parseFloat(secondNum) / 100;
       displayText.textContent = secondNum;
    } else if (lastUsed === 'firstNum' && parseFloat(firstNum) === 0) {
        displayText.textContent = 'Cannot Divide By Zero';
    } else if (lastUsed === 'secondNum' && parseFloat(secondNum) === 0) {
        displayText.textContent = 'Cannot Divide By Zero';
    }
};

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
number.addEventListener('click', populateNumbers);
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
operator.addEventListener('click', populateOperator);
});

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', operate);

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', populateDecimal);

const backspaceButton = document.querySelector('.backspace');
backspaceButton.addEventListener('click', backspace);

const changeSignButton = document.querySelector('.change-sign');
changeSignButton.addEventListener('click', updateSign);

const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', percentage);