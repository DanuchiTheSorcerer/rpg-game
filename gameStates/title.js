import { GameState } from "./gameState";
import { Canvas } from "../extraModules/canvas"

export class Title extends GameState {
    constructor() {
        super("title", [new Canvas(0,0,1,1,"main")]);
    }
    draw() {
        requestAnimationFrame(this.draw)
    }
};