export function Environment() {
    const SPACING = 1;

    let slots = null;

    this.render = myr => {
        myr.primitives.drawLine(myr.Color.RED, 0, 0, myr.getWidth(), myr.getHeight());
    };

    this.setup = config => {
        slots = new Array(config.getPopulationSize());
    };
}