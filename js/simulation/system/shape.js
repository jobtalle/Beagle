import {Symbol} from "./symbol.js";

export function Shape(symbols, angle) {
    const INITIAL_ANGLE = Math.PI * -0.5;
    const BRANCH_LENGTH = 0.2;

    this.edges = [];

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

        for (const symbol of symbols) {
            switch (symbol.getIndex()) {
                case Symbol.TURN_RIGHT:
                    a[a.length - 1] -= angle;

                    break;
                case Symbol.TURN_LEFT:
                    a[a.length - 1] += angle;

                    break;
                case Symbol.BRANCH_OPEN:
                    x.push(x[x.length - 1]);
                    y.push(y[y.length - 1]);
                    a.push(a[a.length - 1]);

                    break;
                case Symbol.BRANCH_CLOSE:
                    if (this.edges.length > 0)
                        this.edges[this.edges.length - 1].leaf = true;

                    x.pop();
                    y.pop();
                    a.pop();

                    break;
                default:
                    const newX = x[x.length - 1] + Math.cos(a[a.length - 1]) * BRANCH_LENGTH;
                    const newY = y[y.length - 1] + Math.sin(a[a.length - 1]) * BRANCH_LENGTH;

                    this.edges.push(makeEdge(x[x.length - 1], y[y.length - 1], newX, newY));

                    x[x.length - 1] = newX;
                    y[y.length - 1] = newY;
            }
        }

        if (this.edges.length > 0)
            this.edges[this.edges.length - 1].leaf = true;
    };

    build();
}