export function Simulation(view, environment) {
    let configuration = null;

    this.getEnvironment = () => environment;

    this.isConfigured = () => configuration != null;

    this.step = () => {
        for (const instance of environment.getInstances())
            instance.evolve(configuration.getLifetime());
    };

    this.setup = config => {
        environment.setup(config);

        view.setFocus(environment.getWidth() * 0.5, -config.getHillHeight() * 0.5);

        configuration = config;
    };

    this.clear = () => {
        configuration = null;
    };
}