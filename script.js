let storedNumber = "";
let firstNum = "";
let reset = true;
let calculation = false;
let periodt = false;

function calculator() {
    const display = document.querySelector(".display .res");
    const operationDis = document.querySelector(".display .op");
    document.addEventListener("click", e => {

        if (e.target.tagName == "BUTTON") {
            const button = e.target.value;
            if (button === "back") {
                const lastItem = display.lastChild;
                display.removeChild(lastItem);
            }

            if (!periodt && button=== "."){
                const symbol = document.createTextNode(button);
                display.appendChild(symbol);
                storedNumber += button;
                periodt = true;
            }

            if (button in [1,2,3,4,5,6,7,8,9,10,]){
                if (reset==false){

                    clearDisplay(display)
                    reset = true
                }

                const symbol = document.createTextNode(button);
                display.appendChild(symbol);
                storedNumber += button;
                
            };
            

            if (button === "C") {
                clearDisplay(display); clearDisplay(operationDis)
                storedNumber = "";
                firstNum = "";
                periodt = false;
                
            };

            if (button === "+" || button === "−" || button === "÷" || button === "×") {                
                clearDisplay(operationDis)
                if (firstNum !== ""){
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
                
            };
            if (button === "=") {
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
    if (countDecimals(a+b) > 10) {
        return (a-b).toFixed(10);
    }
    return a - b;
};

const mul = function(a, b) {
    if (countDecimals(a+b) > 10) {
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
var countDecimals = function (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
};
calculator()