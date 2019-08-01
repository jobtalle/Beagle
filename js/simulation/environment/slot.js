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
        const colorBranch = Myr.Color.fromHSV(hue, 0.8, 0.7);
        const colorLeaf = Myr.Color.fromHSV((hue + 0.5) % 1.0, 0.8, 0.7);
        const width = Math.min(Slot.MAX_SIZE, Math.max(1, Math.ceil(scale * instance.getShape().getWidth())));
        const height = Math.min(Slot.MAX_SIZE, Math.max(1, Math.ceil(scale * instance.getShape().getHeight())));

        surface = new myr.Surface(width, height);

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
Slot.MAX_SIZE = 800;