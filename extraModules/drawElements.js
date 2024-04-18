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
        this.type = "rect"
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.rect((this.x*can.width)/(canvas.widthRel*1200),
                (this.y*can.height)/(canvas.heightRel*675),
                (this.width*can.width)/(canvas.widthRel*1200),
                (this.height*can.height)/(canvas.heightRel*675))
        ctx.fill()
    }
}

export class Button extends DrawElement {
    constructor(canvasNumber,x,y,width,height) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = "button"
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.rect((this.x*can.width)/(canvas.widthRel*1200),
                (this.y*can.height)/(canvas.heightRel*675),
                (this.width*can.width)/(canvas.widthRel*1200),
                (this.height*can.height)/(canvas.heightRel*675))
        ctx.fillStyle = 'rgb(0,0,255)'
        
        if (inputPacket.mouseX > this.x + canvas.xRel * 1200 && 
            inputPacket.mouseY > this.y + canvas.yRel * 675 && 
            inputPacket.mouseX < this.x + this.width + canvas.xRel * 1200 && 
            inputPacket.mouseY < this.y + this.height + canvas.yRel * 675) {
            ctx.fillStyle = 'rgb(255,0,0)'
        }
        ctx.fill()
    }
}