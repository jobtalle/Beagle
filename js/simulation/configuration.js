export function Configuration() {
    const getValue = id => document.getElementById(id).value;

    const animate =            getValue("sim-option-animate");
    const populationSize =     getValue("sim-option-population-size");
    const lifetime =           getValue("sim-option-lifetime");
    const frequency =          getValue("sim-option-frequency");
    const mutationRate =       getValue("sim-option-mutation-rate");
    const crossoverRate =      getValue("sim-option-crossover-rate");
    const selectionSize =      getValue("sim-option-selection-size");
    const hills =              getValue("sim-option-hills");
    const hillHeight =         getValue("sim-option-hill-height");
    const reproductionRadius = getValue("sim-option-reproduction-radius");

    this.isAnimated =            () => animate;
    this.getPopulationSize =     () => populationSize;
    this.getLifetime =           () => lifetime;
    this.getFrequency =          () => frequency;
    this.getMutationRate =       () => mutationRate;
    this.getCrossoverRate =      () => crossoverRate;
    this.getSelectionSize =      () => selectionSize;
    this.getHills =              () => hills;
    this.getHillHeight =         () => hillHeight;
    this.getReproductionRadius = () => reproductionRadius;
}