import {Terrain} from "./terrain.js";
import {LInstance} from "../system/instance.js";
import {LSystem} from "../system/system.js";
import {Symbol} from "../system/symbol.js";

export function Environment() {
    const SPACING = 1;

    let terrain = null;
    let instances = null;

    const makeInitialInstance = () => new LInstance(new LSystem(new Symbol(), [], []));

    this.render = myr => {
        if (terrain)
            terrain.render(myr);
    };

    this.setup = config => {
        instances = [];

        for (let i = 0; i < config.getPopulationSize(); ++i)
            instances.push(makeInitialInstance());

        terrain = new Terrain(SPACING * config.getPopulationSize(), config);
    };

    this.getWidth = () => {
        return SPACING * instances.length
    };
}