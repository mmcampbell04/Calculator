const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operand');
const equalsBtn = document.getElementById('equals');
const deleteBtn = document.getElementById('delete');
const clearBtn = document.getElementById('clear');
let previousDisplay = document.querySelector('.previous-operand');
let currentDisplay = document.querySelector('.current-operand');

let currentOperand = "";
let operator = "";
let solution = "";




// get user input NUMBER and add to current display section 
const getNumber = (e) => {
    // see if there is a decimal already in the screen with text content 
    if (e.target.innerText === "." && currentDisplay.innerText.includes(".")) return; 
    currentOperand += e.target.innerText;
    currentDisplay.innerText = currentOperand;
    
    
}

numberBtns.forEach(button => {
button.addEventListener("click", getNumber);

});


// get user input OPERATOR
// once operator selected, first value and operator to previousop display - previous op = current and then currentop == ""
// if there is no content in the current display, can't select operator;
// if the previous op is NOT empty, then run the math function 

getOperator = (e) => {
// if there's no number then do nothing
if (!currentOperand) return;

// if there is already an operator present, then run calculate function and store the result in solution variable; 
    if (operator) { 
        solution = calculate(operator, solution, currentOperand);

        
        // otherwise if its the first time, then move the currentOperand to the solution variable to then be able to get a new operand
    } else { 
        solution = currentOperand;
    }
    
    operator = e.target.innerText;
    // call function with operator parameter to give the function access to operator; 
    updateDisplay(operator);
    
}

// move the new value and the operator to the previous display and clear the current display & current operand;
updateDisplay = (op) => {
    if (solution === "L000000L") {
        previousDisplay.innerText = "" ;
        currentDisplay.innerText = solution;
        currentOperand = "";
        solution = "";
        removeEffects();
    } 
    else {
    previousDisplay.innerText = solution + " " + op;
    currentDisplay.innerText = "";
    currentOperand = "";
    }
}

operationBtns.forEach(button => {
button.addEventListener("click", getOperator);

});

// disable use of numbers after trying to divide by zero and snarky message
const removeEffects = () => {
    numberBtns.forEach(button => {
        button.removeEventListener("click", getNumber);
    })
}

// turn the strings into numbers... 
const calculate = () => {
    a = parseFloat(solution);
    b = parseFloat(currentOperand);

    switch (operator) {
        case "+": 
        return a + b;
        break;
        case "−": 
            return a - b;
        break;
        case "x": 
        return a * b;
        break;
        case "/":
            if (b === 0) {
                return "L000000L";
                
            } else 
            return a / b;
        break;
        case "%":
            return a % b;
        default:
        return;
    } 


};

const equalsOp = () => {
    // if don't have both numbers, then don't run the math!
    // call the calculate function otherwise
    // show a 'big' solution in the current display 
    // wipe the previous display element & the operator to then be abel to continue 
    // current operand then becomes solution to be able to continue 
    if (!currentOperand || !solution) return 
    solution = calculate(operator, solution, currentOperand)
    // round to two decimals but only if needed - changes number to string with toFixed and the the + turns it back to a number & JS basically sorts it
    solution = +solution.toFixed(2);
    currentDisplay.innerText = solution;
    previousDisplay.innerText = "";
    currentOperand = solution;
    operator = "";
        
};

equalsBtn.addEventListener("click", equalsOp);





// delete button functionality;
const deleteItems = () => {
    currentOperand = currentOperand.slice(0, -1)
    currentDisplay.innerText = currentOperand;
    }

deleteBtn.addEventListener("click", deleteItems);



// all clear button to wipe all content 
const clearAll = () => {
    currentDisplay.innerText = "";
    currentOperand = "";
    operator = "";
    previousDisplay.innerText = "";
    solution = "";
}

clearBtn.addEventListener("click", clearAll);


// only show 2 decimals and break number up nicely... 