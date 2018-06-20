export function System(axiom, rules, constants, angle) {
    const makeMatch = (count, result) => {
        return {
            count: count,
            result: result
        };
    };

    this.apply = symbols => {
        if (symbols.length === 0)
            return axiom;

        const result = [];

        for (let i = 0; i < symbols.length; ++i) {
            const matches = [];

            ruleLoop:
            for (const rule of rules) {
                let j = 0;

                for (const symbol of rule.getCondition())
                    if (i + j < symbols.length && symbols[i + j++].getIndex() !== symbol.getIndex())
                        continue ruleLoop;

                matches.push(makeMatch(rule.getCondition().length, rule.getResult()));
            }

            if (matches.length  === 0) {
                result.push(symbols[i]);

                continue;
            }

            const match = matches[Math.floor(matches.length * Math.random())];

            for (const symbol of match.result)
                result.push(symbol);
        }

        return result;
    };

    this.getAxiom = () => axiom;
    this.getRules = () => rules;
    this.getConstants = () => constants;
    this.getAngle = () => angle;
    this.isConstant = symbol => constants.indexOf(symbol.getIndex()) !== -1;
}