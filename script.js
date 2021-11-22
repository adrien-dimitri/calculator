let storedNumber = "";
let firstNum = "";
let secondNum = "";
function calculator() {
    const display = document.querySelector(".display p");
        document.addEventListener("click", e => {

        if (e.target.tagName == "BUTTON") {
            const button = e.target.value;

            if (button in [1,2,3,4,5,6,7,8,9,10,] || button=== "."){
                const symbol = document.createTextNode(button);
                display.appendChild(symbol);
                storedNumber += button;
            };

            if (button === "C") {
                clearDisplay(display);
                storedNumber = "";
                firstNum = "";
                secondNum = "";
            };

            if (button === "+" || button === "-" || button === "/" || button === "*") {                
                switch (button) {
                    case "+":
                        operand = "add"
                        break;
                    case "-":
                        operand = "sub"
                        break;
                    case "/":
                        operand = "div"
                        break;
                    case "*":
                        operand = "mul"
                        break;
                    default:
                        return;
                };   
                firstNum = storedNumber;
                storedNumber = "";
                clearDisplay(display);
                
            };
            if (button === "=") {
                if (storedNumber === "" || firstNum === ""){
                    return
                }
                clearDisplay(display);
                const result = operate(operand, firstNum, storedNumber)
                const final = document.createTextNode(result);
                display.appendChild(final);
                storedNumber = parseInt(result);

            };
        };
    });
    
}
const add = function(a, b) {
    a = parseFloat(a)
    b = parseFloat(b)
    return a + b;
};
const sub = function(a, b) {return a - b;};
const mul = function(a, b) {return a * b;};
const div = function(a, b)  {return a / b;};
   
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

calculator()