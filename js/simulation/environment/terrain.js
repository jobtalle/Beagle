import {Sample} from "./sample.js";

export function Terrain(width, config) {
    const RESOLUTION = 0.5;

    const heights = new Array(width / RESOLUTION + 1);

    const sampleHeight = x => {
        const c = 0.5 - Math.cos((x / width) * Math.PI * 2 * config.getHills()) * 0.5;

        return c * config.getHillHeight();
    };

    const calculateHeights = () => {
        for (let i = 0; i < heights.length; ++i)
            heights[i] = sampleHeight(i * RESOLUTION);
    };

    this.render = myr => {
        for (let i = 0; i < heights.length - 1; ++i)
            myr.primitives.drawLine(myr.Color.RED, i * RESOLUTION, -heights[i], (i + 1) * RESOLUTION, -heights[i + 1]);
    };

    this.sample = x => {
        return new Sample(x, -sampleHeight(x));
    };

    calculateHeights();
}