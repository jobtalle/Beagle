export function LSystem(axiom, rules, constants) {
    this.apply = symbols => {
        if (symbols.length === 0)
            return axiom;

        const result = [];

        for (const symbol of symbols)
            result.push(symbol.copy());

        return result;
    };
}