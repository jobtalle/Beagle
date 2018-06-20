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

        const hue = Math.random();
        const colorBranch = myr.Color.fromHSV(hue, 0.8, 0.7);
        const colorLeaf = myr.Color.fromHSV((hue + 0.5) % 1.0, 0.8, 0.7);

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

Slot.compare = (a, b) => b.getScore() - a.getScore();