import { GameState } from "./gameState";
import { Canvas } from "../extraModules/canvas"

export class Dungeon extends GameState {
    constructor() {
        super("title", [
            new Canvas(0,0,0.25,1,1,"side"),
            new Canvas(0.25,0,0.75,0.67,1,"main"),
            new Canvas(0.25,0.67,0.75,0.33,1,"bottom")]);
        this.cycle = 0
    }
    draw() {
        this.canvasData[0].refresh()
        this.canvasData[1].refresh()
        this.canvasData[2].refresh()
        this.canvasData[0].rectDraw(150,150,100,100)
        this.canvasData[1].lineDraw(0,0,100,100)
        this.cycle++
        window.requestAnimationFrame(this.draw)
    }
};