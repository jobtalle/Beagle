import {Terrain} from "./terrain.js";
import {LInstance} from "../system/instance.js";
import {LSystem} from "../system/system.js";
import {Symbol} from "../system/symbol.js";

export function Environment() {
    const INITIAL_ANGLE = Math.PI * -0.5;
    const BRANCH_LENGTH = 0.2;
    const SPACING = 1;

    let terrain = null;
    let instances = null;
    let samples = null;

    const makeInitialInstance = () => new LInstance(new LSystem([new Symbol(0)], [], []));

    const renderInstance = (myr, sample, instance) => {
        let angle = [INITIAL_ANGLE];
        let x = [sample.getX()];
        let y = [sample.getY()];

        for (const symbol of instance.getSymbols()) {
            const newX = x[x.length - 1] + Math.cos(angle[angle.length - 1]) * BRANCH_LENGTH;
            const newY = y[y.length - 1] + Math.sin(angle[angle.length - 1]) * BRANCH_LENGTH;

            myr.primitives.drawLine(
                myr.Color.GREEN,
                x[x.length - 1],
                y[y.length - 1],
                newX,
                newY);

            x[x.length - 1] = newX;
            y[y.length - 1] = newY;
        }
    };

    this.render = myr => {
        if (!terrain)
            return;

        terrain.render(myr);

        for (let i = 0; i < instances.length; ++i)
            renderInstance(myr, samples[i], instances[i]);
    };

    this.setup = config => {
        instances = [];
        samples = [];

        terrain = new Terrain(SPACING * config.getPopulationSize(), config);

        for (let i = 0; i <= config.getPopulationSize(); ++i) {
            instances.push(makeInitialInstance());
            samples.push(terrain.sample(i * SPACING));
        }
    };

    this.getWidth = () => {
        return SPACING * instances.length
    };
}