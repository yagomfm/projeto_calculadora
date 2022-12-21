const previousOperationText = document.querySelector('#prev');
const currentOperationText = document.querySelector('#post');
const buttons = document.querySelectorAll('#container button');

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    //Adiciona os dígitos na tela
    addDigit(digit) {
        //Checa se já existe um ponto na operação
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }
    //Processa as operações
    processOperation(operation) {
        //Checa de o valor na tela está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //Mudança de operação
            if(this.previousOperationText.innerText !== ""){ 
                this.changeOperation(operation);
            }
            return
        }
        //Pega o valor anterior e atual
        let operationValue;
        const prev = +this.previousOperationText.innerText.split(" ")[0];
        const post = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = prev + post
                this.updateScreen(operationValue, operation, post, prev);
                break
            case "-":
                operationValue = prev - post
                this.updateScreen(operationValue, operation, post, prev);
                break
            case "*":
                operationValue = prev * post
                this.updateScreen(operationValue, operation, post, prev);
                break
            case "/":
                operationValue = prev / post
                this.updateScreen(operationValue, operation, post, prev);
                break
            case "DEL":
                this.processDelOperator();
                break
            case "CE":
                this.processClearCurrentOperation();
                break
            case "C":
                this.processClear();
                break
            case "=":
                this.processEqual();
                break
            default:
                return;
        }
    }

    //Muda os valores na tela
    updateScreen(operationValue = null, operation = null, post = null, prev = null) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checar se o valor é zero
            if(prev === 0) {
                operationValue = post;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //Mudança de operação
    changeOperation(operation){
        const mathOperation = ["*", "/", "+", "-"]
        if(!mathOperation.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Deleta o último digito do número
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    //Apaga a operação atual
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }
    //Limpa toda a operação
    processClear(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    //Iguala a operação
    processEqual(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerHTML;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});