import { GameState } from "../main";

export class Title extends GameState {
    constructor() {
        super("title", [
            //width scalar and heigh scalar determine % of screen the canvas takes up
            //xPosPerc and yPosPerc determine the % of the top left corner of the screen distance the canvas starts
            {xPosPerc:0,yPosPerc:0,widthScalar:1,heightScalar:1}
        ])
    }
}