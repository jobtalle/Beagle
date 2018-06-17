export function Slot(sample, instance) {
    let score;
    let surface = null;
    let selected = false;

    this.getSample = () => sample;
    this.getInstance = () => instance;
    this.getSelected = () => selected;
    this.setSelected = isSelected => selected = isSelected;
    this.getScore = () => score;
    this.getSurface = () => surface;
    this.grow = (lifetime, rater) => {
        instance.grow(lifetime);

        score = rater.rate(instance.getShape(), sample);
    };

    this.setInstance = newInstance => {
        instance = newInstance;
        selected = false;
    };

    this.makeSurface = (myr, scale) => {
        if (surface)
            surface.free();

        const colorBranch = myr.Color.BLUE;
        const colorLeaf = myr.Color.RED;

        surface = new myr.Surface(
            Math.ceil(scale * instance.getShape().getWidth()),
            Math.ceil(scale * instance.getShape().getHeight()));

        surface.bind();

        for (const edge of instance.getShape().edges)
            myr.primitives.drawLine(
                edge.leaf?colorLeaf:colorBranch,
                (edge.x1 - instance.getShape().left) * scale,
                (edge.y1 - instance.getShape().top) * scale,
                (edge.x2 - instance.getShape().left) * scale,
                (edge.y2 - instance.getShape().top) * scale);
    };
}

Slot.compare = (a, b) => a.getScore() - b.getScore();