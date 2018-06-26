export function Configuration() {
    const getValue = id => document.getElementById(id).value;

    const MutationConfiguration = function() {
        const crossoverRate = getValue("sim-option-crossover-rate");
        const constantCreationRate = getValue("sim-option-constant-creation");
        const constantRemovalRate = getValue("sim-option-constant-removal");
        const angleMutation = getValue("sim-option-angle-mutation");
        const axiomMutation = getValue("sim-option-axiom-mutation");
        const conditionMutation = getValue("sim-option-rule-condition-mutation");
        const resultMutation = getValue("sim-option-rule-result-mutation");
        const ruleDisappearance = getValue("sim-option-rule-disappearance-rate");
        const ruleDuplication = getValue("sim-option-rule-duplication-rate");

        // The chance of crossing over when combining system atoms
        this.getCrossoverRate = () => crossoverRate;

        // The chance a symbol is added to the constants
        this.getConstantCreationRate = () => constantCreationRate;

        // The chance a constant becomes activated again
        this.getConstantRemovalRate = () => constantRemovalRate;

        // The mutation of the branching angle
        this.getAngleMutationRate = () => angleMutation;

        // The chance of mutating an axiom
        this.getAxiomMutationRate = () => axiomMutation;

        // The chance of changing rule conditions
        this.getRuleConditionMutationRate = () => conditionMutation;

        // The chance of changing rule results
        this.getRuleResultMutationRate = () => resultMutation;

        // The chance of a rule disappearing
        this.getRuleDisappearRate = () => ruleDisappearance;

        // The chance of a rule duplicating
        this.getRuleDuplicationRate = () => ruleDuplication;

        // The chance of creating a new rule
        this.getRuleCreationRate = () => 0.01;

        // The chance a new symbol branches
        this.getNewBranchChance = () => 0.1;

        // The chance a new symbol is added to the system
        this.getNewSymbolChance = () => 0.1;

        // The chance a new symbol is a rotation
        this.getRotationChance = () => 0.3;
    };

    const populationSize = getValue("sim-option-population-size");
    const lifetime = getValue("sim-option-lifetime");
    const stepSize = getValue("sim-option-step-size");

    const hills = getValue("sim-option-hills");
    const hillHeight = getValue("sim-option-hill-height");
    const reproductionRadius = getValue("sim-option-reproduction-radius");

    const mutationConfiguration = new MutationConfiguration();

    // Number of instances
    this.getPopulationSize = () => populationSize;

    // Number of growth iterations
    this.getLifetime = () => lifetime;

    // Generations per simulation step
    this.getStepSize = () => stepSize;

    // Number of hills
    this.getHills = () => hills;

    // Hill height in meters
    this.getHillHeight = () => hillHeight;

    // Number of instances to look away for mates
    this.getReproductionRadius = () => reproductionRadius;

    // Mutation related parameters
    this.getMutationConfiguration = () => mutationConfiguration;
}