const buttons = document.querySelectorAll(".button");
const textInput = document.querySelector(".calc-number");
const operators = document.querySelectorAll(".operator");
const input = document.querySelectorAll("input");
const reset = document.querySelector("#resetButton");
const deleteBtn = document.querySelector("#deleteButton");
const equalBtn = document.querySelector("#equalBtn");

let inputArr = ["", ""];
let operate = "";
let total = ""
let id = 0;

function updateScreen() {
    if(inputArr[id] === "") {
        textInput.value = "0"
    } else {
        textInput.value = inputArr[id]
    }
}

function deleteCalc() {
    if(inputArr.length > 0) { 
        inputArr[id] = inputArr[id].slice(0, -1)
     updateScreen();
    }
}
function resetCalc() {
    inputArr = ["", ""];
    operate = "";
    id = 0;
    updateScreen();
}

function calculate() {
    var result = eval(inputArr[0] + operate + inputArr[1]);
    operate = "";
    inputArr[1] = "";
    inputArr[0] = result;
    id = 0;
    updateScreen();
    inputArr[0] = "";
}
reset.addEventListener("click", resetCalc);
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const regex = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/

        if( regex.test(inputArr[id]+button.value) ) {
            inputArr[id] += button.value;
            textInput.value = inputArr[id];
        }
    })
})

deleteBtn.addEventListener("click", deleteCalc)
equalBtn.addEventListener("click", calculate);
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(inputArr[0] === "" && textInput.value !== "0") {
            inputArr[0] = textInput.value;
        }
        id++
        switch(operator.value) {
            case "+":
            case "-":
            case "/":
                operate = operator.value;
                break;
            case "x":
                operate = "*"
        }
        // console.log("variables", inputArr, "id", id, "operator", operate)
    })
})