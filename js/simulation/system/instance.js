import {Shape} from "./shape.js";

export function Instance(system) {
    let symbols = [];
    let shape = null;

    const apply = () => symbols = system.apply(symbols);

    this.getShape = () => shape;
    this.getSystem = () => system;
    this.getSymbols = () => symbols;

    this.grow = lifetime => {
        for (let i = 0; i < lifetime; ++i)
            apply();

        shape = new Shape(symbols, system);
    };

    apply();
}