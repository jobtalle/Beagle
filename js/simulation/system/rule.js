export function Rule(condition, result) {
    this.getCondition = () => condition;
    this.setCondition = newSymbols => condition = newSymbols;
    this.getResult = () => result;
    this.setResult = newResult => result = newResult;
    this.copy = () => {
        const newCondition = [];
        const newResult = [];

        for (const symbol of condition)
            newCondition.push(symbol.copy());

        for (const symbol of result)
            newResult.push(symbol.copy());

        return new Rule(newCondition, newResult);
    }
}