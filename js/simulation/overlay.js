export function Overlay() {
    const ID_OVERLAY = "overlay";
    const element = document.getElementById(ID_OVERLAY);

    const createGeneration = simulation => {
        return document.createTextNode("Generation " + simulation.getGeneration());
    };

    this.update = simulation => {
        element.innerHTML = "";

        element.appendChild(createGeneration(simulation));
    };
}