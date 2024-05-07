//[new Canvas(0,0,0.25,1,1,"side"),new Canvas(0.25,0,0.75,0.67,1,"main"),new Canvas(0.25,0.67,0.75,0.33,1,"bottom")]
//[new Canvas(0,0,1,1,1,"main")]
import { Rect, Button, Sprite } from "./drawElements"
export class DrawController {
    constructor(canvases) {
        this.canvases = canvases
        this.elements = []
    }
    refreshAll(inputPacket) {
        //refresh canvases
        for(let i = 0;i<this.canvases.length;i++) {
            this.canvases[i].refresh()
        }
        //draw elements
        for (let i = 0;i<this.elements.length;i++) {
            this.elements[i].draw(this.canvases[this.elements[i].canvasNumber],inputPacket)
        }
    }
    newRect(canvasNumber,x,y,width,height,color) {
        this.elements.push(new Rect(canvasNumber,x,y,width,height,color))
    }
    newButton(canvasNumber,x,y,width,height,color,text) {
        this.elements.push(new Button(canvasNumber,x,y,width,height,color,text))
    }
    newSprite(canvasNumber,x,y,scaleWidth,source) {
        this.elements.push(new Sprite(canvasNumber,x,y,scaleWidth,source))
    }
    resetElements() {
        this.elements = []
    }
}