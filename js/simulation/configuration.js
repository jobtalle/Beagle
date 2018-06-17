export function Configuration() {
    const getValue = id => document.getElementById(id).value;

    const MutationConfiguration = function() {
        const crossoverRate =      getValue("sim-option-crossover-rate");

        // The chance of crossing over when combining system atoms
        this.getCrossoverRate =      () => crossoverRate;

        // The chance a symbol is added to the constants
        this.getConstantizationRate = () => 0.05;

        // The chance a constant becomes activated again
        this.getConstantRemovalRate = () => 0.05;
    };

    const animate =            getValue("sim-option-animate");
    const populationSize =     getValue("sim-option-population-size");
    const lifetime =           getValue("sim-option-lifetime");

    const hills =              getValue("sim-option-hills");
    const hillHeight =         getValue("sim-option-hill-height");
    const reproductionRadius = getValue("sim-option-reproduction-radius");

    const mutationConfiguration = new MutationConfiguration();

    this.isAnimated =               () => animate;

    // Number of instances
    this.getPopulationSize =        () => populationSize;

    // Number of growth iterations
    this.getLifetime =              () => lifetime;

    // Number of hills
    this.getHills =                 () => hills;

    // Hill height in meters
    this.getHillHeight =            () => hillHeight;

    // Number of instances to look away for mates
    this.getReproductionRadius =    () => reproductionRadius;

    // Mutation related parameters
    this.getMutationConfiguration = () => mutationConfiguration;
}