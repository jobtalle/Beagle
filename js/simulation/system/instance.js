import {Shape} from "./shape.js";

export function LInstance(system) {
    let symbols = [];
    let shape = null;

    this.apply = () => symbols = system.apply(symbols);
    this.getSymbols = () => symbols;
    this.getShape = () => shape;

    this.apply();

    shape = new Shape(symbols, system.getAngle());
}