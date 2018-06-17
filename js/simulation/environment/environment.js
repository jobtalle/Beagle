import {Terrain} from "./terrain.js";
import {LInstance} from "../system/instance.js";
import {LSystem} from "../system/system.js";
import {Symbol} from "../system/symbol.js";
import {Rule} from "../system/rule.js";

export function Environment() {
    const INITIAL_SYMBOLS = [
        new Symbol(Symbol.VAR_FIRST)
    ];
    const INITIAL_TURN_SIZE = 0.45;
    const SPACING = 1;

    let terrain = null;
    let instances = null;
    let samples = null;

    const makeInitialInstance = () => new LInstance(new LSystem(
        INITIAL_SYMBOLS,
        [
            new Rule(
                [
                    new Symbol(Symbol.VAR_FIRST)
                ],
                [
                    new Symbol(Symbol.VAR_FIRST + 1),
                    new Symbol(Symbol.BRANCH_OPEN),
                    new Symbol(Symbol.TURN_RIGHT),
                    new Symbol(Symbol.VAR_FIRST),
                    new Symbol(Symbol.BRANCH_CLOSE),
                    new Symbol(Symbol.BRANCH_OPEN),
                    new Symbol(Symbol.TURN_LEFT),
                    new Symbol(Symbol.VAR_FIRST),
                    new Symbol(Symbol.BRANCH_CLOSE),
                    new Symbol(Symbol.VAR_FIRST + 1),
                    new Symbol(Symbol.VAR_FIRST)
                ]
            ),
            new Rule(
                [
                    new Symbol(Symbol.VAR_FIRST + 1)
                ],
                [
                    new Symbol(Symbol.VAR_FIRST + 1),
                    new Symbol(Symbol.VAR_FIRST + 1)
                ]
            )
        ],
        [],
        INITIAL_TURN_SIZE));

    const renderInstance = (myr, sample, instance) => {
        for (const edge of instance.getShape().edges)
            myr.primitives.drawLine(
                edge.leaf?myr.Color.GREEN:myr.Color.BLUE,
                sample.getX() + edge.x1,
                sample.getY() + edge.y1,
                sample.getX() + edge.x2,
                sample.getY() + edge.y2);
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

    this.getInstances = () => instances;
    this.getWidth = () => SPACING * instances.length;
}