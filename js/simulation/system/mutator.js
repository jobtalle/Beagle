import {Instance} from "./instance.js";
import {System} from "./system.js";
import {Symbol} from "./symbol.js";

export function Mutator(config) {
    const Combination = function(first, second) {
        const indices = []; // Indices that may exist in this system
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

            for (let i = 0; i < systems[index].getAxiom().length; ++i) {
                const symbol = systems[index].getAxiom()[i];

                addToLibrary(symbol);
                this.axiom.push(symbol);

                cross();
            }

            for (let i = 0; i < systems[index].getRules().length; ++i) {
                const rule = systems[index].getRules()[i];

                for (const symbol of rule.getSymbols())
                    addToLibrary(symbol);

                for (const symbol of rule.getResult())
                    addToLibrary(symbol);

                this.rules.push(rule);

                cross();
            }

            for (let i = 0; i < systems[index].getConstants().length; ++i) {
                if (Math.random() > config.getConstantRemovalRate())
                    this.constants.push(systems[index].getConstants()[i]);

                cross();
            }

            this.angle = systems[index].getAngle();
        };

        const mutate = () => {
            // Mutate constants
            if (Math.random() < config.getConstantizationRate()) {
                const constant = indices[Math.floor(Math.random() * indices.length)];

                if (this.constants.indexOf(constant) === -1)
                    this.constants.push(constant);
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