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
    constructor(canvasNumber,x,y,width,height,color,text) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.text = text
        this.type = "button"
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.fillStyle = "black"
        ctx.fillRect(((this.x-2)*can.width)/(canvas.widthRel*1200),
                ((this.y-2)*can.height)/(canvas.heightRel*675),
                ((this.width+4)*can.width)/(canvas.widthRel*1200),
                ((this.height+4)*can.height)/(canvas.heightRel*675))
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
        
        if (inputPacket.mouseX > this.x + canvas.xRel * 1200 && 
            inputPacket.mouseY > this.y + canvas.yRel * 675 && 
            inputPacket.mouseX < this.x + this.width + canvas.xRel * 1200 && 
            inputPacket.mouseY < this.y + this.height + canvas.yRel * 675) {
            if (inputPacket.leftMouse) {
                ctx.fillStyle = `rgb(${this.color[0]*0.75},${this.color[1]*0.75},${this.color[2]*0.75})`
            }
        }
        ctx.fillRect((this.x*can.width)/(canvas.widthRel*1200),
                (this.y*can.height)/(canvas.heightRel*675),
                (this.width*can.width)/(canvas.widthRel*1200),
                (this.height*can.height)/(canvas.heightRel*675))
        ctx.fillStyle = "black"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.font = `${this.height * window.innerHeight/1000}px Verdana`
        ctx.fillText(this.text,((this.x+this.width/2)*can.width)/(canvas.widthRel*1200),
                            ((this.y+this.height/2)*can.height)/(canvas.heightRel*675))
    }
}