import { GameState } from "./gameState";
import { Canvas } from "../extraModules/canvas"

export class Title extends GameState {
    constructor() {
        super("title", [new Canvas(0,0,1,1,1,"main")]);
        this.draw = this.draw.bind(this)
    }
    draw() {
        this.canvasData[0].refresh()
        window.requestAnimationFrame(this.draw)
    }
};