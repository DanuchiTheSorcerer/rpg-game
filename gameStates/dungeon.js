import { GameState } from "./gameState";
import { DrawController } from "../extraModules/drawController"
import { Canvas } from "../extraModules/canvas"

export class Dungeon extends GameState {
    constructor() {
        super("dungeon", new DrawController([new Canvas(0,0,0.25,1,1,"side"),new Canvas(0.25,0,0.75,0.67,1,"main"),new Canvas(0.25,0.67,0.75,0.33,1,"bottom")]));
    }
    draw() {
        alert("started drawing")
        this.drawController.refreshAll()
        alert("canvases refreshed")
        alert("alerting canvas ids " + this.drawController.canvases[0].heightRel + ' ' + this.drawController.canvases[1].heightRel + ' ' + this.drawController.canvases[2].heightRel)
        window.requestAnimationFrame(this.draw)
    }
};