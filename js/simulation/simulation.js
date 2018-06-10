export function Simulation(environment) {
    let configuration = null;

    this.getEnvironment = () => environment;

    this.isConfigured = () => configuration != null;

    this.step = () => {

    };

    this.setup = config => {
        configuration = config;
    };
}