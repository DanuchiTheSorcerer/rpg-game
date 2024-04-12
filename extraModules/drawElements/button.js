import { Element } from "./element"
export class ButtonElement extends Element {
    constructor(canvasNumber,x,y,width,height) {
        super(canvasNumber,x,y,width,height)
        this.borderWidth = 0
        this.borderColor = "#000000"
        this.fillColor = "#ffffff"
    }
    draw(canvas) {
        let canv = document.getElementById(canvas.id)
        let ctx = canv.getContext("2d")
        ctx.beginPath()
        ctx.rect((this.x*canv.width)/(canvas.widthRel*1200),
                (this.y*canv.height)/(canvas.heightRel*675),
                (this.width*canv.width)/(canvas.widthRel*1200),
                (this.height*canv.height)/(canvas.heightRel*675))
        ctx.fill()
    }
}