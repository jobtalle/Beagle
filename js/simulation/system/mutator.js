import {Instance} from "./instance.js";
import {System} from "./system.js";
import {Symbol} from "./symbol.js";
import {Rule} from "./rule.js";

export function Mutator(config) {
    const Combination = function(first, second) {
        const indices = []; // Indices that occur in this system
        let highestIndex = Symbol.VAR_FIRST;

        this.axiom = [];
        this.rules = [];
        this.constants = [];
        this.angle = 0;

        const addToLibrary = symbol => {
            if (symbol.getIndex() < Symbol.VAR_FIRST || indices.indexOf(symbol.getIndex()) !== -1)
                return;

            indices.push(symbol.getIndex());

            if (symbol.getIndex() > highestIndex)
                highestIndex = symbol.getIndex();
        };

        const crossover = () => {
            const systems = [first, second];
            let index = Math.round(Math.random());

            const cross = () => {
                if (Math.random() < config.getCrossoverRate())
                    index = 1 - index;
            };

            // Combine axiom
            for (let i = 0; i < systems[index].getAxiom().length; ++i) {
                const symbol = systems[index].getAxiom()[i];

                addToLibrary(symbol);
                this.axiom.push(symbol.copy());
            }

            cross();

            // Combine rules
            for (let i = 0; i < systems[index].getRules().length; ++i) {
                if (Math.random() < config.getRuleCreationRate())
                    this.rules.push(new Rule([createSymbolVar(false)], [createSymbolVar(true)]));

                if (Math.random() < config.getRuleDisappearRate())
                    continue;

                const rule = systems[index].getRules()[i];

                for (const symbol of rule.getCondition())
                    addToLibrary(symbol);

                for (const symbol of rule.getResult())
                    addToLibrary(symbol);

                this.rules.push(rule.copy());

                if (Math.random() < config.getRuleDuplicationRate())
                    this.rules.push(rule.copy());

                cross();
            }

            // Combine constants
            for (let i = 0; i < systems[index].getConstants().length; ++i)
                if (Math.random() > config.getConstantRemovalRate())
                    this.constants.push(systems[index].getConstants()[i]);

            cross();

            // Combine angle
            this.angle = systems[index].getAngle();
        };

        const createSymbolVar = allowNew => {
            if (allowNew && Math.random() < config.getNewSymbolChance())
                return new Symbol(++highestIndex);
            else
                return new Symbol(indices[Math.floor(Math.random() * indices.length)]);
        };

        const createSymbols = () => {
            let symbol;

            if (Math.random() < config.getRotationChance()) {
                if (Math.random() < 0.5)
                    symbol = new Symbol(Symbol.TURN_LEFT);
                else
                    symbol = new Symbol(Symbol.TURN_RIGHT);
            }
            else
                symbol = createSymbolVar(true);


            if (Math.random() < config.getNewBranchChance())
                return [new Symbol(Symbol.BRANCH_OPEN), symbol, new Symbol(Symbol.BRANCH_CLOSE)];
            else
                return [symbol];
        };

        const removePart = (symbols, index, replacement) => {
            while (symbols[index].getIndex() === Symbol.BRANCH_CLOSE)
                --index;

            if (symbols[index].getIndex() === Symbol.BRANCH_OPEN) {
                let scope = 1;
                let length = 0;

                while (scope !== 0) {
                    switch (symbols[index + ++length].getIndex()) {
                        case Symbol.BRANCH_OPEN:
                            ++scope;
                            break;
                        case Symbol.BRANCH_CLOSE:
                            --scope;
                            break;
                    }
                }

                symbols.splice(index, length + 1);
            }
            else
                symbols.splice(index, 1);

            if (replacement !== undefined)
                symbols.splice(index, 0, ...replacement);

            return symbols;
        };

        const mutateSymbols = symbols => {
            if (symbols.length > 1 && Math.random() < 0.333) {
                // Remove
                symbols = removePart(symbols, Math.floor(Math.random() * (symbols.length - 1)));
            }
            else if (symbols.length > 1 && Math.random() < 0.5) {
                // Replace
                symbols = removePart(symbols, Math.floor(Math.random() * (symbols.length - 1)), createSymbols());
            }
            else {
                // Add
                symbols.splice(Math.floor(Math.random() * symbols.length), 0, ...createSymbols());
            }

            return symbols;
        };

        const mutate = () => {
            // Add constants
            if (Math.random() < config.getConstantCreationRate()) {
                const constant = indices[Math.floor(Math.random() * indices.length)];

                if (this.constants.indexOf(constant) === -1)
                    this.constants.push(constant);
            }

            // Mutate rules
            for (const rule of this.rules) {
                // Mutate condition
                for(let i = 0; i < rule.getCondition().length; ++i)
                    if (Math.random() < config.getRuleConditionMutationRate())
                        rule.setCondition(mutateSymbols(rule.getCondition()));

                for(let i = 0; i < rule.getResult().length; ++i)
                    if (Math.random() < config.getRuleResultMutationRate())
                        rule.setResult(mutateSymbols(rule.getResult()));
            }

            // Mutate angle
            this.angle += (Math.random() - 0.5) * 2 * config.getAngleMutationRate();
        };

        crossover();
        mutate();
    };

    this.mutate = (first, second) => {
        const combination = new Combination(first.getSystem(), second.getSystem());

        return new Instance(new System(
            combination.axiom,
            combination.rules,
            combination.constants,
            combination.angle));
    };
}