import {Mutator} from "./system/mutator.js";

export function Simulation(view, environment) {
    let configuration = null;
    let mutator = null;

    this.getEnvironment = () => environment;

    this.isConfigured = () => configuration != null;

    this.step = () => {
        environment.reproduce(configuration, mutator);
        environment.grow(configuration.getLifetime());
    };

    this.setup = config => {
        mutator = new Mutator(config.getMutationConfiguration());

        environment.setup(config);
        view.setFocus(environment.getWidth() * 0.5, -config.getHillHeight() * 0.5);

        configuration = config;
    };

    this.clear = () => {
        configuration = null;
    };

    this.select = (x, y) => {
        const worldCoordinates = view.toWorldCoordinates(x, y);
        const selected = environment.findInstance(worldCoordinates.x, worldCoordinates.y);

        return selected !== null;
    };
}