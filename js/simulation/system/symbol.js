export function Symbol(index) {
    this.copy = () => {
        return new Symbol(index);
    };

    this.getIndex = () => index;
}

Symbol.BRANCH_OPEN =  0;
Symbol.BRANCH_CLOSE = 1;
Symbol.TURN_RIGHT =   2;
Symbol.TURN_LEFT =    3;
Symbol.VAR_FIRST =    4;