import {Unit} from "./unit.js";

let Application = PIXI.Application;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let AnimatedSprite = PIXI.AnimatedSprite

const width = window.innerWidth;
const height = window.innerHeight;

const option = {
    width,
    height
};

// встраиваем приложение
const application = new Application(option);
application.renderer.backgroundColor = 0xffffff;
document.body.appendChild(application.view);

const atlasNeanderthal = [
    {name:"baseLeft", url:"../effects/neanderthalBaseLeft.json"},
    {name:"baseRight", url:"../effects/neanderthalBaseRight.json"},
    {name:"goLeft", url:"../effects/neanderthalGoLeft.json"},
    {name:"goRight", url:"../effects/neanderthalGoRight.json"},
    {name:"hitLeft", url:"../effects/neanderthalHitLeft.json"},
    {name:"hitRight", url:"../effects/neanderthalHitRight.json"}
];



const neanderthal = new Unit(atlasNeanderthal, loader, resources, AnimatedSprite, application);

document.addEventListener('keydown', (e) => {
    neanderthal.changeState(e.key, application);
});

document.addEventListener('keyup', () => {
    neanderthal.changeState('base', application);
})






