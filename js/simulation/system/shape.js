import {Symbol} from "./symbol.js";

export function Shape(symbols, system) {
    const INITIAL_ANGLE = Math.PI * -0.5;
    const BRANCH_LENGTH = 0.1;
    const PADDING = BRANCH_LENGTH;

    this.edges = [];
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;

    const makeEdge = (x1, y1, x2, y2) => {
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            leaf: false
        }
    };

    const build = () => {
        const x = [0];
        const y = [0];
        const a = [INITIAL_ANGLE];
        let lastEdge = [null];

        for (const symbol of symbols) {
            switch (symbol.getIndex()) {
                case Symbol.TURN_RIGHT:
                    a[a.length - 1] -= system.getAngle();

                    break;
                case Symbol.TURN_LEFT:
                    a[a.length - 1] += system.getAngle();

                    break;
                case Symbol.BRANCH_OPEN:
                    lastEdge.push(null);

                    x.push(x[x.length - 1]);
                    y.push(y[y.length - 1]);
                    a.push(a[a.length - 1]);

                    break;
                case Symbol.BRANCH_CLOSE:
                    if (lastEdge.length === 0)
                        console.log("Too far");

                    if (lastEdge[lastEdge.length - 1])
                        lastEdge.pop().leaf = true;

                    x.pop();
                    y.pop();
                    a.pop();

                    break;
                default:
                    if (system.isConstant(symbol))
                        continue;

                    const newX = x[x.length - 1] + Math.cos(a[a.length - 1]) * BRANCH_LENGTH;
                    const newY = y[y.length - 1] + Math.sin(a[a.length - 1]) * BRANCH_LENGTH;

                    if (newX < this.left)
                        this.left = newX;
                    else if (newX > this.right)
                        this.right = newX;

                    if (newY < this.top)
                        this.top = newY;
                    else if (newY > this.bottom)
                        this.bottom = newY;

                    lastEdge[lastEdge.length - 1] = makeEdge(x[x.length - 1], y[y.length - 1], newX, newY);
                    this.edges.push(lastEdge[lastEdge.length - 1]);

                    x[x.length - 1] = newX;
                    y[y.length - 1] = newY;
            }
        }

        if (lastEdge[lastEdge.length - 1])
            lastEdge.pop().leaf = true;

        this.left -= PADDING;
        this.top -= PADDING;
        this.right += PADDING;
        this.bottom += PADDING;
    };

    this.getWidth = () => this.right - this.left;
    this.getHeight = ()=> this.bottom - this.top;

    build();
}