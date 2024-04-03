import { GameState } from "./gameState";
import { Canvas } from "../extraModules/canvas"

export class Title extends GameState {
    constructor() {
        super("title", [new Canvas(0,0,0.5,1,"main")]);
    }
    draw() {
        this.canvasData[0].refresh()
        requestAnimationFrame(this.draw)
    }
};