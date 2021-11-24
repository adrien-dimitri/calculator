let storedNumber = "";
let firstNum = "";
let reset = true;
let ongoingCalc = false;
let periodt = false;

function calculator() {
    const display = document.querySelector(".display .res"); //main display
    const operationDis = document.querySelector(".display .op"); //operand display
    document.addEventListener("click", e => {

        if (e.target.tagName == "BUTTON") {
            const button = e.target.value;
            if (button === "back") {
                if (firstNum === "") return; //if no input, skip
                const lastItem = display.lastChild;
                display.removeChild(lastItem);
            }

            if (!periodt && button=== "."){ //check for "." and allow only one
                const symbol = document.createTextNode(button);
                display.appendChild(symbol);
                storedNumber += button;
                periodt = true;
            }

            if (button in [1,2,3,4,5,6,7,8,9,10]){ //check for digit input
                if (reset==false){

                    clearDisplay(display)
                    reset = true
                }

                const symbol = document.createTextNode(button);
                display.appendChild(symbol);
                storedNumber += button;
                
            };
            

            if (button === "C") { //clear button
                clearDisplay(display); clearDisplay(operationDis)
                storedNumber = "";
                firstNum = "";
                periodt = false;
                ongoingCalc = false;
                
            };

            if (button === "+" || button === "−" || button === "÷" || button === "×") { //operand buttons

                if (ongoingCalc === true) {  //if an operand was input already, don't calculate further
                    clearDisplay(operationDis)
                    switch (button) {
                        case "+":
                            operand = "add"
                            break;
                        case "−":
                            operand = "sub"
                            break;
                        case "÷":
                            operand = "div"
                            break;
                        case "×":
                            operand = "mul"
                            break;
                        default:
                            return;
                    };
                  
                const opSymbol = document.createTextNode(button); //simply change operand 
                operationDis.appendChild(opSymbol);
                
                return;
                }

                clearDisplay(operationDis)

                if (firstNum !== ""){ //if chained calculation (no "=" used), calculate result continuously
                    clearDisplay(display)
                    const result = operate(operand, firstNum, storedNumber)
                    const final = document.createTextNode(result);
                    display.appendChild(final);
                    storedNumber = parseInt(result);
                    reset = false
                    firstNum = result;
                };
                switch (button) {
                    case "+":
                        operand = "add"
                        break;
                    case "−":
                        operand = "sub"
                        break;
                    case "÷":
                        operand = "div"
                        break;
                    case "×":
                        operand = "mul"
                        break;
                    default:
                        return;
                };  
                const opSymbol = document.createTextNode(button);
                operationDis.appendChild(opSymbol);

                
                firstNum = storedNumber;
                storedNumber = "";
                reset = false;
                periodt = false;
                ongoingCalc = true;
                
            };

            if (button === "=") { //for "=" sign
                clearDisplay(operationDis)
                if (storedNumber === "" || firstNum === ""){
                    return
                }
                clearDisplay(display);
                const result = operate(operand, firstNum, storedNumber)
                const final = document.createTextNode(result);
                display.appendChild(final);
                storedNumber = parseFloat(result);
                firstNum = "";
                reset = false;
                periodt = false;
                ongoingCalc = false;

            };
            
        };
    });
    
}
const add = function(a, b) {
    a = parseFloat(a)
    b = parseFloat(b)
    if (countDecimals(a+b) > 10) {
        return (a+b).toFixed(10);
    }
    return (a + b);
};

const sub = function(a, b) {
    if (countDecimals(a-b) > 10) {
        return (a-b).toFixed(10);
    }
    return a - b;
};

const mul = function(a, b) {
    if (countDecimals(a*b) > 10) {
        return (a*b).toFixed(10);
    }
    return a * b;
};

const div = function(a, b)  {
    if (countDecimals(a/b) > 10) {
        return (a/b).toFixed(10);
    }
    return a / b;
};
   
const operate = function(operator, a, b) {
    switch (operator) {
        case "add":
            return add(a, b);
        case "sub":
            return sub(a, b);
        case "mul":
            return mul(a, b);
        case "div":
            return div(a, b);
    };
};

function clearDisplay(display) {
    while(display.firstChild) {
        display.removeChild(display.lastChild);
    }
}
const countDecimals = function (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length; 
};
calculator()