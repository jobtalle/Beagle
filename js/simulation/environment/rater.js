export function Rater(config) {
    const LEAF_PHOTO_INTERVAL = 0.1;
    const LEAF_OVERLAP_SCORE_FALLOFF = 0.8;

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

        const fill = (x, y) => {
            x = Math.floor(x / LEAF_PHOTO_INTERVAL);
            y = Math.floor(y / LEAF_PHOTO_INTERVAL);

            score += getDensityOverlapScore(++grid[x + y * width]);
        };

        for (const edge of shape.edges) if (edge.leaf) {
            fill(edge.x2 - shape.left, edge.y2 - shape.top);

            ++leafCount;
        }

        return score / leafCount;
    };

    this.rate = (shape, sample) => {
        return rateDensity(shape);
    };
}