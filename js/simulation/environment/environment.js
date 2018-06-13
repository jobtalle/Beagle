import {Terrain} from "./terrain.js";

export function Environment() {
    const SPACING = 1;

    let terrain = null;
    let slots = null;

    this.render = myr => {
        if (terrain)
            terrain.render(myr);
    };

    this.setup = config => {
        slots = [];
        slots.length = config.getPopulationSize();

        terrain = new Terrain(SPACING * config.getPopulationSize(), config);
    };

    this.getWidth = () => {
        return SPACING * slots.length
    };
}