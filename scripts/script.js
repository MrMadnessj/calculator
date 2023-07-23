class Calculator{
    constructor(prevOperandText, currOperandText){
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.allclear();
    }

    allclear(){
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    clear(){
        this.currOperand = this.currOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperator(operator){
        if(this.currOperand == '') return;     
        if(this.prevOperand !== ''){
            this.compute();
        }
        this.operation = operator;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute(){
        let computation;
        let prev = parseFloat(this.prevOperand);
        let curr = parseFloat(this.currOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            case '%':
                computation = prev % curr;
                break;
            case 'x':
                computation = prev * curr;
                break;
            default:
                return;
        }

        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';

    }

    fancyNumber(number){
        let stringNumber = number.toString();
        let integerDigits = parseFloat(stringNumber.split('.')[0]);
        let decimalDigits = stringNumber.split('.')[1];

        let finalNumber;
        if(isNaN(integerDigits))
            finalNumber = '';
        else
            finalNumber = integerDigits.toLocaleString( 'en', {maximumFractionDigits : 0});
        
        if(decimalDigits != null)  
            return `${finalNumber}.${decimalDigits}`;
        else
            return finalNumber;
    }

    updateDisplay(){
        this.currOperandText.innerText = this.fancyNumber(this.currOperand);
        if(this.operation != null){
            this.prevOperandText.innerText = 
            `${this.fancyNumber(this.prevOperand)} ${this.operation}`;
        }
        else
            this.prevOperandText.innerText = '';
    }
}





const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const allClearButton = document.querySelector('[data-all-clear]');

const prevOperandText = document.querySelector('[data-prev-operand]');
const currOperandText = document.querySelector('[data-curr-operand]');


const calculator = new Calculator(prevOperandText, currOperandText);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerHTML);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();  
})


allClearButton.addEventListener('click', button => {
    calculator.allclear();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})