import {Mutator} from "./system/mutator.js";

export function Simulation(view, environment, inspector) {
    let configuration = null;
    let mutator = null;
    let generation;

    this.getEnvironment = () => environment;
    this.isConfigured = () => configuration != null;

    this.step = () => {
        inspector.inspect(null);

        environment.reproduce(configuration, mutator);
        environment.grow(configuration.getLifetime());
        view.setChanged();

        ++generation;
    };

    this.setup = config => {
        mutator = new Mutator(config.getMutationConfiguration());
        generation = 0;

        environment.setup(config);
        view.setFocus(environment.getWidth() * 0.5, -config.getHillHeight() * 0.5);

        configuration = config;
    };

    this.getGeneration = () => generation;

    this.clear = () => {
        configuration = null;
    };

    this.select = (x, y) => {
        if (!this.isConfigured())
            return;

        const worldCoordinates = view.toWorldCoordinates(x, y);
        const selected = environment.findSlot(worldCoordinates.x, worldCoordinates.y);

        inspector.inspect(selected);
        environment.setSelected(selected);
        view.setChanged();

        return selected !== null;
    };
}