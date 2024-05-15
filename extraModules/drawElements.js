class DrawElement {
    constructor(canvasNumber) {
        this.canvasNumber = canvasNumber
    }
}

export class Rect extends DrawElement {
    constructor(canvasNumber,x,y,width,height,color) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.type = "rect"
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        //big brain scaing of rectangle
        ctx.rect((this.x*can.width)/(canvas.widthRel*1200),
                (this.y*can.height)/(canvas.heightRel*675),
                (this.width*can.width)/(canvas.widthRel*1200),
                (this.height*can.height)/(canvas.heightRel*675))
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
        ctx.fill()
    }
}

export class Button extends Rect {
    constructor(canvasNumber,x,y,width,height,color,text) {
        super(canvasNumber,x,y,width,height,color)
        this.text = text
        this.type = "button"
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.fillStyle = "black"
        //big brain scaing of rectangle
        ctx.fillRect(((this.x-2)*can.width)/(canvas.widthRel*1200),
                ((this.y-2)*can.height)/(canvas.heightRel*675),
                ((this.width+4)*can.width)/(canvas.widthRel*1200),
                ((this.height+4)*can.height)/(canvas.heightRel*675))
        //set color
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
        //change the appearance if it is being pressed
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
        //text location calculations go burrrr
        ctx.fillStyle = "black"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.font = `${this.height * window.innerHeight/1000}px Verdana`
        ctx.fillText(this.text,((this.x+this.width/2)*can.width)/(canvas.widthRel*1200),
                            ((this.y+this.height/2)*can.height)/(canvas.heightRel*675),
                            (this.width*can.width)/(canvas.widthRel*1200))
    }
}

export class Sprite extends DrawElement {
    constructor(canvasNumber,x,y,scaleWidth,source) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.scaleWidth = scaleWidth
        this.source = source
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        let img = new Image()
        img.src = this.source
        ctx.drawImage(img, (this.x*can.width)/(canvas.widthRel*1200),
                        (this.y*can.height)/(canvas.heightRel*675),
                        (this.scaleWidth*can.width)/(canvas.widthRel*1200),
                        (this.scaleWidth*(img.height/img.width)*can.height)/(canvas.heightRel*675))
    }
}

export class Circle extends DrawElement {
    constructor(canvasNumber,x,y,radius,color) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.beginPath();
        ctx.arc((this.x*can.width)/(canvas.widthRel*1200),
        (this.y*can.height)/(canvas.heightRel*675),(this.radius*can.width)/(canvas.widthRel*1200) , 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')'
        ctx.fill();
    }
}