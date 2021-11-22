const frame = document.querySelector(".frame")


const add = function(a, b) {
    return a + b;
};
const sub = function(a, b) {
    return a - b;
};
const mul = function(a, b) {
    return a * b;
};
const div = function(a, b) {
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