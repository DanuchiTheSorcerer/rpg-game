import { ButtonElement } from "./drawElements/button"
export class DrawController {
    constructor(canvases) {
        this.canvases = canvases
        this.elements = []
    }
    refreshAll() {
        for(let i = 0;i<this.canvases.length;i++) {
            this.canvases[i].refresh()
        }
        for (let i=0;i<this.elements.length;i++) {
            this.elements[i].draw(this.canvases[this.elements[i].canvasNumber])
        }
    }
    newButton(canvasId,x,y,width,height) {
        for (let i = 0;i<this.canvases.length;i++) {
            if (this.canvases[i].id=canvasId) {
                this.elements.push(new ButtonElement(i,x,y,width,height))
            }
        }
    }
}