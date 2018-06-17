import {Renderer} from "./renderer/renderer.js"
import {Simulation} from "./simulation/simulation.js";
import {Environment} from "./simulation/environment/environment.js";
import {Configuration} from "./simulation/configuration.js";
import {View} from "./renderer/view.js";
import {Inspector} from "./simulation/inspector.js";

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

const canvas = document.getElementById(ID_RENDERER);
const myr = new Myr(canvas);
const view = new View(myr, canvas.width, canvas.height);
const simulation = new Simulation(view, new Environment(), new Inspector());
new Renderer(myr, view, simulation);

let pressed = false;
let selected = false;
let moved = false;

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

    simulation.clear();
};

canvas.addEventListener("mousemove", event => {
    view.onMouseMove(
        event.clientX - canvas.getBoundingClientRect().left,
        event.clientY - canvas.getBoundingClientRect().top);

    if (pressed)
        moved = true;
});

canvas.addEventListener("mousedown", event => {
    if (!selected)
        selected = simulation.select(
            event.clientX - canvas.getBoundingClientRect().left,
            event.clientY - canvas.getBoundingClientRect().top);

    view.onMousePress();

    moved = false;
    pressed = true;
});

canvas.addEventListener("mouseleave", () => {
    view.onMouseRelease();
});

canvas.addEventListener("mouseup", event => {
    view.onMouseRelease();

    if (!moved && selected)
        selected = simulation.select(
            event.clientX - canvas.getBoundingClientRect().left,
            event.clientY - canvas.getBoundingClientRect().top);

    pressed = false;
});

canvas.addEventListener("mousewheel", event => {
    if (event.deltaY < 0)
        view.onZoomIn();
    else
        view.onZoomOut();
});