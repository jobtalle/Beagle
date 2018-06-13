export function Symbol(index) {
    this.copy = () => {
        return new Symbol(index);
    };

    this.getIndex = () => index;
}