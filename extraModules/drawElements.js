class DrawElement {
    constructor(canvasNumber) {
        this.canvasNumber = canvasNumber
    }
}

export class Rect extends DrawElement {
    constructor(canvasNumber,x,y,width,height) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw(canvas) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.beginPath()
        ctx.rect((this.x*can.width)/(canvas.widthRel*1200),
                (this.y*can.height)/(canvas.heightRel*675),
                (this.width*can.width)/(canvas.widthRel*1200),
                (this.height*can.height)/(canvas.heightRel*675))
        ctx.fill()
    }
}