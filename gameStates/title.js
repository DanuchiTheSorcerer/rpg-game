import { GameState } from "./gameState";
import { DrawController } from "../extraModules/drawController"
import { Canvas } from "../extraModules/canvas"

export class Title extends GameState {
    constructor() {
        super("title", new DrawController([new Canvas(0,0,1,1,1,"main")]));
    }
};