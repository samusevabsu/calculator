class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.previousOperandTextElement.innerText = ''
        this.currentOperandTextElement.innerText = ''
        this.operation = ''
        this.currentOperand = ''
        this.previousOperand = ''
    }

    delete() {
        
        this.currentOperand = this.previousOperand
        this.previousOperand = ''
        this.operation = ''

    }

    appendNumber(number) {     
                
        if (this.currentOperand == undefined) {
            this.currentOperand = ''
        }
        
        if (this.previousOperand == undefined) {
            this.previousOperand = ''
        } 

        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number.toString()
    }

    chooseOperation(operation) {
        
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let result

        let previous = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        switch(this.operation){
            case '+':
                result = previous + current
            break

            case '-':
                result = previous - current
            break

            case '*':
                result = previous * current
            break

            case '÷':
                result = previous / current
            break

            default: 
            return
        }
        this.currentOperand = result
        this.previousOperand = ''
        this.operation = ''
    }

    root() {
        

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand + this.operation  
    }  
}


let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');
let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]');
let deleteButton = document.querySelector('[data-delete]');
let allClearButton = document.querySelector('[data-all-clear]');
let equalsButton = document.querySelector('[data-equals]');
let rootButton = document.querySelector('[data-root]');
let exponintButton = document.querySelector('[data-exponent]');

let calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

rootButton.addEventListener('click', button => {
    calculator.root()
    calculator.updateDisplay()
})

