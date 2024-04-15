import { GameState } from "./gameState";
import { DrawController } from "../extraModules/drawController"
import { Canvas } from "../extraModules/canvas"

export class Dungeon extends GameState {
    constructor() {
        super("dungeon", new DrawController([new Canvas(0,0,0.25,1,1,"side"),new Canvas(0.25,0,0.75,0.67,1,"main"),new Canvas(0.25,0.67,0.75,0.33,1,"bottom")]));
    }
    draw() {
        this.drawController.refreshAll()
        window.requestAnimationFrame(this.draw)
    }
};