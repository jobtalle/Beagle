import {Sample} from "./sample.js";

export function Terrain(width, config) {
    const RESOLUTION = 0.5;

    const heights = new Array(width / RESOLUTION + 1);

    const calculateHeights = () => {
        for (let i = 0; i < heights.length; ++i) {
            const c = 0.5 - Math.cos((i / heights.length) * Math.PI * 2 * config.getHills()) * 0.5;

            heights[i] = c * config.getHillHeight();
        }
    };

    this.render = myr => {
        for (let i = 0; i < heights.length - 1; ++i)
            myr.primitives.drawLine(myr.Color.RED, i * RESOLUTION, -heights[i], (i + 1) * RESOLUTION, -heights[i + 1]);

        myr.primitives.drawLine(myr.Color.BLUE, 0, 0, width, 0);
    };

    this.sample = x => {
        return new Sample();
    };

    calculateHeights();
}