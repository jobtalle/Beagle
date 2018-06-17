export function Configuration() {
    const getValue = id => document.getElementById(id).value;

    const MutationConfiguration = function() {
        const mutationRate =       getValue("sim-option-mutation-rate");
        const crossoverRate =      getValue("sim-option-crossover-rate");

        this.getMutationRate =       () => mutationRate;
        this.getCrossoverRate =      () => crossoverRate;
    };

    const animate =            getValue("sim-option-animate");
    const populationSize =     getValue("sim-option-population-size");
    const lifetime =           getValue("sim-option-lifetime");
    const frequency =          getValue("sim-option-frequency");

    const hills =              getValue("sim-option-hills");
    const hillHeight =         getValue("sim-option-hill-height");
    const reproductionRadius = getValue("sim-option-reproduction-radius");
    const mutationConfiguration = new MutationConfiguration();

    this.isAnimated =               () => animate;
    this.getPopulationSize =        () => populationSize;
    this.getLifetime =              () => lifetime;
    this.getFrequency =             () => frequency;
    this.getHills =                 () => hills;
    this.getHillHeight =            () => hillHeight;
    this.getReproductionRadius =    () => reproductionRadius;
    this.getMutationConfiguration = () => mutationConfiguration;
}