let number = "";
function calculator() {
    const display = document.querySelector(".display p");
        document.addEventListener("click", e => {

        if (e.target.tagName == "BUTTON") {
            const button = e.target.value;

            if (button in [1,2,3,4,5,6,7,8,9,10]) {
                const symbol = document.createTextNode(button);
                display.appendChild(symbol);
                number += button;
                console.log(number)
            };
            if (button === "C") {
                while(display.firstChild) {
                    display.removeChild(display.lastChild);
                
                number = "";
                console.log(number);
                }
            };
            if (button === "+" || button === "-" || button === "/" || button === "*") {
                switch (button) {
                    case "+":
                        operand = "add"
                    case "-":
                        operand = "sub"
                    case "/":
                        operand = "div"
                    case "*":
                        operand = "mul"
                };   
                console.log(operand)
                
            }
        };
    });
    
}
const add = function(a, b) {return a + b;};
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


calculator()