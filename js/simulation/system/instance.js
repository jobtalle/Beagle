export function LInstance(system) {
    let symbols = [];

    this.apply = () => symbols = system.apply(symbols);
}