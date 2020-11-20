export class InputGroupState {
    typeOfInputCurrency
    typeOfOutputCurrency
    inputAmount
    outputAmount

    setTypeOfInputCurrency(typeOfInputCurrency) {
        this.typeOfInputCurrency = typeOfInputCurrency
        console.log(this.typeOfInputCurrency)
    }
    setTypeOfOutputCurrency(typeOfOutputCurrency) {
        this.typeOfOutputCurrency = typeOfOutputCurrency
    }
    setInputAmount(inputAmount) {
        this.inputAmount = inputAmount 
    }
    setOutputAmount(outputAmount) {
        this.outputAmount = outputAmount
    }
    getTypeOfInputCurrency() {
        return this.typeOfInputCurrency
    }
    getTypeOfOutputCurrency() {
        return this.typeOfOutputCurrency
    }
    getInputAmount() {
        return this.inputAmount
    }
    getOutputAmount() {
        return this.outputAmount
    }
}