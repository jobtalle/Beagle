import {Renderer} from "./renderer/renderer.js"
import {Simulation} from "./simulation/simulation.js";
import {Environment} from "./simulation/environment/environment.js";

const ID_BUTTON_START = "sim-start";
const ID_BUTTON_STEP = "sim-step";
const ID_BUTTON_REWIND = "sim-rewind";

const setInputsDisabled = disabled => {
    for(let form of document.getElementsByClassName("sim-options"))
        for(let element of form.getElementsByTagName("*"))
            element.disabled = disabled;
};

const myr = new Myr(document.getElementById("renderer"));
const simulation = new Simulation(new Environment());

document.getElementById(ID_BUTTON_START).onclick = () => setInputsDisabled(true);
document.getElementById(ID_BUTTON_STEP).onclick = () => setInputsDisabled(true);
document.getElementById(ID_BUTTON_REWIND).onclick = () => setInputsDisabled(false);

new Renderer(myr, simulation);