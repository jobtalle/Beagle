export function Environment() {
    this.render = myr => {
        myr.primitives.drawLine(myr.Color.RED, 0, 0, myr.getWidth(), myr.getHeight());
    };
}