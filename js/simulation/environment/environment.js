import {Terrain} from "./terrain.js";
import {Instance} from "../system/instance.js";
import {System} from "../system/system.js";
import {Symbol} from "../system/symbol.js";
import {Rule} from "../system/rule.js";
import {Slot} from "./slot.js";
import {Rater} from "./rater.js";

export function Environment() {
    const INITIAL_SYMBOLS = [
        new Symbol(Symbol.VAR_FIRST)
    ];
    const INITIAL_TURN_SIZE = 0.45;
    const SPACING = 1;

    let rater = null;
    let terrain = null;
    let slots = null;

    const makeInitialInstance = () => new Instance(new System(
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

        for (const slot of slots)
            renderInstance(myr, slot.getSample(), slot.getInstance());
    };

    this.setup = config => {
        rater = new Rater(config);
        terrain = new Terrain(SPACING * config.getPopulationSize(), config);
        slots = [];

        for (let i = 0; i <= config.getPopulationSize(); ++i)
            slots.push(new Slot(terrain.sample(i * SPACING), makeInitialInstance()));
    };

    this.reproduce = (config, mutator) => {
        const newSlots = [];

        for (let i = 0; i < slots.length; ++i) {
            const candidates = [slots[i]];

            for (let r = 0; r < config.getReproductionRadius(); ++r) {
                if (r >= i)
                    candidates.push(slots[i - r]);

                if (i + r < slots.length)
                    candidates.push(slots[i + r]);
            }

            if (candidates.length < 2)
                continue;

            candidates.sort(Slot.compare);

            newSlots.push(new Slot(slots[i].getSample(), mutator.mutate(
                candidates[0].getInstance(),
                candidates[1].getInstance())));
        }

        slots = newSlots;
    };

    this.grow = lifetime => {
        for (const slot of slots)
            slot.grow(lifetime, rater);
    };

    this.getWidth = () => SPACING * slots.length;
}