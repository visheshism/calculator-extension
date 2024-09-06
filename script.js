const calc = document.querySelector(".calc")
const screen = calc.querySelector(".__value")
const clearBtn = calc.querySelector(".btn__clear")
const toggleBtn = calc.querySelector(".btn__toggle")
const percentageBtn = calc.querySelector(".btn__percentage")
const divideBtn = calc.querySelector(".btn__divide")
const multiplyBtn = calc.querySelector(".btn__multiply")
const subtractBtn = calc.querySelector(".btn__subtract")
const addBtn = calc.querySelector(".btn__add")
const equalsBtn = calc.querySelector(".btn__equals")
const decimalBtn = calc.querySelector(".btn__decimal")
const zeroBtn = calc.querySelector(".btn__zero")
const oneBtn = calc.querySelector(".btn__one")
const twoBtn = calc.querySelector(".btn__two")
const threeBtn = calc.querySelector(".btn__three")
const fourBtn = calc.querySelector(".btn__four")
const fiveBtn = calc.querySelector(".btn__five")
const sixBtn = calc.querySelector(".btn__six")
const sevenBtn = calc.querySelector(".btn__seven")
const eightBtn = calc.querySelector(".btn__eight")
const nineBtn = calc.querySelector(".btn__nine")
const numbers = [zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn];
const operations = [addBtn, subtractBtn, multiplyBtn, divideBtn]

let currentOperation = ""
let preSave
let postSave = 0
let calcvalue

const handleScreenInput = (input) => {

    return (input.toString().length >= 10) || (input.toString().length >= 20) ? (input.toExponential()) : Number(input)
}
const retSpan = (el) => {
    return el.querySelector("span")
}
const clearBtnSet = (state = 0) => {
    if (state == 0) return retSpan(clearBtn).innerHTML = `AC`
    if (state == 1) return retSpan(clearBtn).innerHTML = `C`
}
clearBtn.onclick = () => {
    currentOperation = ""
    clearBtnSet()
    retSpan(screen).innerHTML = 0
    preSave = ""
    postSave = ""
    calcvalue = 0
}
toggleBtn.onclick = () => {
    calcvalue = calcvalue * -1
    retSpan(screen).innerHTML = calcvalue
}
percentageBtn.onclick = () => {
    const result = Number(retSpan(screen).innerHTML) * 0.01
    retSpan(screen).innerHTML = handleScreenInput(result)
}
const checkOperations = (input, element) => {
    if (currentOperation.includes("add") || currentOperation.includes("subtract") || currentOperation.includes("multiply") || currentOperation.includes("divide")) {

        if (currentOperation.includes("add")) return (Number(input) + Number(element))
        else if (currentOperation.includes("subtract")) return (Number(input) - Number(element))
        else if (currentOperation.includes("multiply")) return (Number(input) * Number(element))
        else if (currentOperation.includes("divide")) return (Number(input) / Number(element))
    }
}
equalsBtn.onclick = () => {
    retSpan(screen).innerHTML = calcvalue
    postSave = calcvalue.toString()
}
numbers.map((x, i) => {
    x.onclick = () => {
        clearBtnSet(1)
        if (currentOperation.includes("add") || currentOperation.includes("subtract") || currentOperation.includes("multiply") || currentOperation.includes("divide")) {
            postSave = postSave.toString()
            postSave == 0 ? postSave = i : postSave = postSave + i
            retSpan(screen).innerHTML = postSave
        } else {
            retSpan(screen).innerHTML == 0 ? retSpan(screen).innerHTML = i : retSpan(screen).innerHTML += i
            preSave = Number(retSpan(screen).innerHTML)
        }
        console.log(preSave, postSave, currentOperation, checkOperations(preSave, postSave))
        calcvalue = checkOperations(preSave, postSave)
    }
})
operations.map((x, i) => {
    x.onclick = () => {
        if (currentOperation.length !== 0) preSave = calcvalue; postSave = 0;
        i == 0 ? currentOperation = "add" : i == 1 ? currentOperation = "subtract" : i == 2 ? currentOperation = "multiply" : i == 3 ? currentOperation = "divide" : ''
    }
})

decimalBtn.onclick = () => {
    if (calcvalue) {
        calcvalue = calcvalue.toString();
        if (!calcvalue.includes(".")) {
            calcvalue += ".";
            if (currentOperation.includes("add") || currentOperation.includes("subtract") || currentOperation.includes("multiply") || currentOperation.includes("divide")) {
                if (postSave.includes(".")) {
                    return;
                }
                postSave += ".";
                retSpan(screen).innerHTML = postSave;
            } else {
                if (preSave.includes(".")) {
                    return;
                }
                preSave = preSave.toString()
                preSave += ".";
                retSpan(screen).innerHTML = preSave;
            }
        }
        return;
    }
    preSave = preSave.toString()
    if (preSave.includes(".")) {
        return;
    }
    preSave += ".";
    retSpan(screen).innerHTML = preSave;


};
