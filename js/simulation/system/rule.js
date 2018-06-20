export function Rule(symbols, result) {
    this.getSymbols = () => symbols;
    this.setSymbols = newSymbols => symbols = newSymbols;
    this.getResult = () => result;
    this.setResult = newResult => result = newResult;
    this.copy = () => {
        const newSymbols = [];
        const newResult = [];

        for (const symbol of symbols)
            newSymbols.push(symbol.copy());

        for (const symbol of result)
            newResult.push(symbol.copy());

        return new Rule(newSymbols, newResult);
    }
}