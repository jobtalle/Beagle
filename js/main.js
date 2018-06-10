import {Renderer} from "./renderer/renderer.js"
import {Simulation} from "./simulation/simulation.js";
import {Environment} from "./simulation/environment/environment.js";
import {Configuration} from "./simulation/configuration.js";
import {View} from "./renderer/view.js";

const ID_RENDERER = "renderer";
const ID_OPTIONS = "sim-options";
const ID_BUTTON_START = "sim-start";
const ID_BUTTON_STEP = "sim-step";
const ID_BUTTON_REWIND = "sim-rewind";

const setInputsDisabled = disabled => {
    for(let form of document.getElementsByClassName(ID_OPTIONS))
        for(let element of form.getElementsByTagName("*"))
            element["disabled"] = disabled;
};

const simulation = new Simulation(new Environment());
const canvas = document.getElementById(ID_RENDERER);
const canvasRect = canvas.getBoundingClientRect();
const myr = new Myr(canvas);
const view = new View(myr, canvas.width, canvas.height);
new Renderer(myr, view, simulation);

document.getElementById(ID_BUTTON_START).onclick = () => {
    setInputsDisabled(true);
};

document.getElementById(ID_BUTTON_STEP).onclick = () => {
    setInputsDisabled(true);

    if (!simulation.isConfigured())
        simulation.setup(new Configuration());

    simulation.step();
};

document.getElementById(ID_BUTTON_REWIND).onclick = () => {
    setInputsDisabled(false);
};

canvas.addEventListener("mousemove", event => {
    view.onMouseMove(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
});

canvas.addEventListener("mousedown", () => {
    view.onMousePress();
});

canvas.addEventListener("mouseup", () => {
    view.onMouseRelease();
});

canvas.addEventListener("mousewheel", event => {
    if (event.deltaY < 0)
        view.onZoomIn();
    else
        view.onZoomOut();
});