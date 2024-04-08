import { Canvas } from "./canvas"
//[new Canvas(0,0,0.25,1,1,"side"),new Canvas(0.25,0,0.75,0.67,1,"main"),new Canvas(0.25,0.67,0.75,0.33,1,"bottom")]
//[new Canvas(0,0,1,1,1,"main")]
export class DrawController {
    constructor(canvases) {
        this.canvases = canvases
    }
    refreshAll() {
        for(let i = 0;i<this.canvases.length;i++) {
            this.canvases[i].refresh()
        }
    }
}