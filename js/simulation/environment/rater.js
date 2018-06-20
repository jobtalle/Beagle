export function Rater(config) {
    const LEAF_PHOTO_INTERVAL = 0.1;
    const LEAF_OVERLAP_SCORE_FALLOFF = 0.8;
    const LEAF_COUNT_BONUS = 0.4;

    const getDensityOverlapScore = overlap => {
        const x = LEAF_OVERLAP_SCORE_FALLOFF * (overlap - 1);

        return Math.max(-x * x + 1, 0);
    };

    const rateDensity = shape => {
        const width = Math.ceil(shape.getWidth() / LEAF_PHOTO_INTERVAL);
        const height = Math.ceil(shape.getHeight() / LEAF_PHOTO_INTERVAL);
        const grid = new Array(width * height).fill(0);
        let score = 0;
        let leafCount = 0;

        for (const edge of shape.edges) {
            const x = Math.floor((edge.x2 - shape.left) / LEAF_PHOTO_INTERVAL);
            const y = Math.floor((edge.y2 - shape.top) / LEAF_PHOTO_INTERVAL);

            if (edge.leaf)
                score += getDensityOverlapScore(++grid[x + y * width]);
            else
                ++grid[x + y * width];

            ++leafCount;
        }

        if (leafCount === 0)
            return 0;

        return score / Math.pow(leafCount, 1 - LEAF_COUNT_BONUS);
    };

    const rateSize = (shape, sample) => {
        return Math.max(0, Math.min(1, 300 * sample.getFertility() - shape.edges.length));
    };

    const rateShape = (shape) => {
        let score = 1;

        // Punish underground structures
        for (const edge of shape.edges)
            if (edge.y1 > 0)
                score -= 0.05;

        return score;
    };

    this.rate = (shape, sample) => {
        return rateDensity(shape) * rateSize(shape, sample) * rateShape(shape);
    };
}