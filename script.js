let displayValue = ""
function calculator() {
    const display = document.querySelector(".display p");
        document.addEventListener("click", e => {

        if (e.target.tagName == "BUTTON") {
            const button = e.target.value;

            if (button === "C") {
                while (display.firstChild) {
                    display.removeChild(display.lastChild);
                    displayValue = ""
                };

            };

            if (button !== "C") {
                const symbol = document.createTextNode(button);
                display.appendChild(symbol);
                
                displayValue += button;
                console.log(displayValue);
            };
            
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