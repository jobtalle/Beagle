export function Slot(sample, instance) {
    let score = -1;

    this.getSample = () => sample;
    this.getInstance = () => instance;
    this.getScore = () => score;
    this.grow = (lifetime, rater) => {
        instance.grow(lifetime);

        score = rater.rate(instance.getShape(), sample);
    };
}

Slot.compare = (a, b) => a.getScore() - b.getScore();