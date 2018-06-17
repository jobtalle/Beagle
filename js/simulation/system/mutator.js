import {Instance} from "./instance.js";
import {System} from "./system.js";

export function Mutator(config) {
    const Combination = function(first, second) {
        this.axiom = [];
        this.rules = [];
        this.constants = [];
        this.angle = 0;

        const crossover = () => {
            const systems = [first, second];
            let index = Math.round(Math.random());

            const cross = () => {
                if (Math.random() < config.getCrossoverRate())
                    index = 1 - index;
            };

            for (let i = 0; i < systems[index].getAxiom().length; ++i) {
                this.axiom.push(systems[index].getAxiom()[i]);

                cross();
            }

            for (let i = 0; i < systems[index].getRules().length; ++i) {
                this.rules.push(systems[index].getRules()[i]);

                cross();
            }

            for (let i = 0; i < systems[index].getConstants().length; ++i) {
                this.constants.push(systems[index].getConstants()[i]);

                cross();
            }

            this.angle = systems[index].getAngle();
        };

        const mutate = () => {

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