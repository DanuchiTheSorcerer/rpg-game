import { GameState } from "./gameState";
import { DrawController } from "../extraModules/drawController"
import { Canvas } from "../extraModules/canvas"

export class Title extends GameState {
    constructor() {
        super("title", new DrawController([new Canvas(0,0,0.5,1,1,"main"),new Canvas(0.5,0,0.5,1,1,"rob")]));
    }
    draw() {
        this.drawController.refreshAll()
        window.requestAnimationFrame(this.draw)
    }
};