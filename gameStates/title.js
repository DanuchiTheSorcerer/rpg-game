import { GameState } from "./gameState";

export class Title extends GameState {
    constructor() {
        super("title", [
            //widthRel and heightRel determine % of screen the canvas takes up
            //xRel and yRel determine the % of the top left corner of the screen distance the canvas starts
            {xRel:0,yRel:0,widthRel:1,heightRel:1}
        ])
    }
};