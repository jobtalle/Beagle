import {Renderer} from "./renderer/renderer.js"



const canvas = document.getElementById("renderer");
const myr = new Myr(canvas);
const renderer = new Renderer(myr, null);