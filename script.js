let storedNumber = "";
let firstNum = "";
let reset = true;
let ongoingCalc = false;
let periodt = false;
let negativeNum = false;

function calculator() {
    const display = document.querySelector(".display .res"); //main display
    const operationDis = document.querySelector(".display .op"); //operand display
    document.addEventListener("click", e => {

        if (e.target.tagName == "BUTTON") {
            const button = e.target.value;
            if (button === "back") {    
                storedNumber = Math.floor(storedNumber/10);
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
                negativeNum = false;
                
            };

            if (button === "+" || button === "−" || button === "÷" || button === "×") { //operand buttons
                
                if (storedNumber === "" && firstNum === ""){
                    return
                }
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

                    if (storedNumber === "") {
                        const opSymbol = document.createTextNode(button);
                        operationDis.appendChild(opSymbol);
                        return;
                    }
                    
                    clearDisplay(display);
                    const result = operate(operand, firstNum, -storedNumber)
                    const final = document.createTextNode(result);
                    display.appendChild(final);
                    const opSymbol = document.createTextNode("=");
                    operationDis.appendChild(opSymbol);
                    
                    storedNumber = parseFloat(result);
                    firstNum = "";
                    reset = false;
                    periodt = false;
                    ongoingCalc = false;

                return;
                }

                clearDisplay(operationDis)

                if (firstNum !== ""){ //if chained calculation (no "=" used), calculate result continuously
                    if (storedNumber === "") {
                        return;
                    }
                    clearDisplay(display)
                    const result = operate(operand, firstNum, storedNumber)
                    const final = document.createTextNode(result);
                    display.appendChild(final);
                    const opSymbol = document.createTextNode("=");
                    operationDis.appendChild(opSymbol);
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
                negativeNum = false;
                console.log(firstNum)
                          
            };

            if (button === "=") { //for "=" sign
                clearDisplay(operationDis)
                if (storedNumber === "" || firstNum === ""){
                    return
                }

                if (operand === "div" && storedNumber === "0") {
                    clearDisplay(display);
                    const final = document.createTextNode("seriously? :D");
                    display.appendChild(final);
                    firstNum = "";
                    reset = false;
                    periodt = false;
                    ongoingCalc = false;
                    return;
                }
                clearDisplay(display);
                const result = operate(operand, firstNum, storedNumber)
                const final = document.createTextNode(result);
                display.appendChild(final);
                const opSymbol = document.createTextNode("=");
                operationDis.appendChild(opSymbol);

                if (result < 0) {
                    negativeNum = true;
                }
                
                storedNumber = parseFloat(result);
                firstNum = "";
                reset = false;
                periodt = false;
                ongoingCalc = false;

            };

            if (button === "-"){
                if (negativeNum === false) {
                const symbol = document.createTextNode(button);
                display.prepend(symbol);
                negativeNum = true;
                
                storedNumber = -storedNumber;
                }
                else {
                    display.removeChild(display.firstChild);
                    negativeNum = false;
                    
                    storedNumber = -storedNumber;
                };
            };
             
            
        };
    });
    
}
const add = function(a, b) {
    a = parseFloat(a)
    b = parseFloat(b)
    if (countDecimals(a+b) > 9) {
        return (a+b).toFixed(8);
    }
    return (a + b);
};

const sub = function(a, b) {
    a = parseFloat(a)
    b = parseFloat(b)
    if (countDecimals(a-b) > 9) {
        return (a-b).toFixed(8);
    }
    return a - b;
};

const mul = function(a, b) {
    if (countDecimals(a*b) > 9) {
        return (a*b).toFixed(8);
    }
    return a * b;
};

const div = function(a, b)  {
    if (countDecimals(a/b) > 9) {
        return (a/b).toFixed(8);
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