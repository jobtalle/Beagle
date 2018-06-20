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
    let renderScale = -1;
    let updated = true;
    let selected = null;

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

    const updateSlotGraphics = myr => {
        if (!slots)
            return;

        for (const slot of slots)
            slot.makeSurface(myr, renderScale);

        myr.bind();
    };

    const renderSlot = (myr, scale, slot) => {
        const inverseScale = 1.0 / scale;

        slot.getSurface().drawScaled(
            slot.getSample().getX() + slot.getInstance().getShape().left,
            slot.getSample().getY() + slot.getInstance().getShape().top,
            inverseScale,
            inverseScale);

        if (slot.getSelected())
            myr.primitives.drawRectangle(
                myr.Color.RED,
                slot.getSample().getX() + slot.getInstance().getShape().left,
                slot.getSample().getY() + slot.getInstance().getShape().top,
                slot.getInstance().getShape().getWidth(),
                slot.getInstance().getShape().getHeight());
    };

    this.render = (myr, scale) => {
        if (!terrain)
            return;

        if (scale !== renderScale || updated) {
            renderScale = scale;
            updated = false;

            updateSlotGraphics(myr);
        }

        for (const slot of slots)
            renderSlot(myr, scale, slot);

        terrain.render(myr);
    };

    this.setup = config => {
        rater = new Rater(config);
        terrain = new Terrain(SPACING * config.getPopulationSize(), config);
        slots = [];

        for (let i = 0; i <= config.getPopulationSize(); ++i)
            slots.push(new Slot(terrain.sample(i * SPACING), makeInitialInstance()));
    };

    this.reproduce = (config, mutator) => {
        const newInstances = [];

        for (let i = 0; i < slots.length; ++i) {
            const candidates = [slots[i]];

            for (let r = 0; r < config.getReproductionRadius(); ++r) {
                if (i >= r)
                    candidates.push(slots[i - r]);

                if (i + r < slots.length)
                    candidates.push(slots[i + r]);
            }

            if (candidates.length < 2) {
                newInstances.push(mutator.mutate(
                    candidates[0].getInstance(),
                    candidates[0].getInstance()));

                continue;
            }

            candidates.sort(Slot.compare);

            newInstances.push(mutator.mutate(
                candidates[0].getInstance(),
                candidates[1].getInstance()));
        }

        for (let i = 0; i < slots.length; ++i)
            slots[i].setInstance(newInstances[i]);
    };

    this.grow = lifetime => {
        for (const slot of slots)
            slot.grow(lifetime, rater);

        updated = true;
    };

    this.findSlot = (x, y) => {
        for (const slot of slots) {
            const sample = slot.getSample();
            const shape = slot.getInstance().getShape();

            if (
                x > sample.getX() + shape.left &&
                x < sample.getX() + shape.right &&
                y > sample.getY() + shape.top &&
                y < sample.getY() + shape.bottom)
                return slot;
        }

        return null;
    };

    this.setSelected = newSelected => {
        if (newSelected === selected)
            return;

        for (const slot of slots) {
            if (slot === selected)
                slot.setSelected(false);
            else if (slot === newSelected)
                slot.setSelected(true);
        }

        selected = newSelected;
    };

    this.getWidth = () => SPACING * slots.length;
}