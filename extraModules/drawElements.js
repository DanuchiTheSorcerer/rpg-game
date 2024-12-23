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
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
        ctx.fillRect(Math.floor(this.x*canvas.resolutionFactor),
        Math.floor(this.y*canvas.resolutionFactor),
        Math.ceil(this.width*canvas.resolutionFactor),
        Math.ceil(this.height*canvas.resolutionFactor))
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
        let mouseInput = {
            x:(inputPacket.mouseX-1200*canvas.xRel)/canvas.widthRel,
            y:(inputPacket.mouseY-675*canvas.yRel)/canvas.heightRel
        }
        ctx.fillStyle = "black"
        //big brain scaing of rectangle
        ctx.fillRect(((this.x-2)*canvas.resolutionFactor),
                ((this.y-2)*canvas.resolutionFactor),
                ((this.width+4)*canvas.resolutionFactor),
                ((this.height+4)*canvas.resolutionFactor))
        //set color
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
        //change the appearance if it is being pressed
        if (mouseInput.x > (this.x) && 
            mouseInput.y > (this.y) && 
            mouseInput.x < (this.x) + (this.width)  && 
            mouseInput.y < (this.y) + (this.height)) {
            ctx.fillStyle = `rgb(${this.color[0]*0.75},${this.color[1]*0.75},${this.color[2]*0.75})`
        }
        ctx.fillRect((this.x*canvas.resolutionFactor),
                (this.y*canvas.resolutionFactor),
                (this.width*canvas.resolutionFactor),
                (this.height*canvas.resolutionFactor))
         // Set the fill color for the text
         ctx.fillStyle = 'black';

         // Start with a large font size
         let fontSize = 50 * canvas.resolutionFactor;
         ctx.font = fontSize + 'px Verdana';
 
         // Measure the text dimensions
         let textWidth = ctx.measureText(this.text).width;
         let textHeight = fontSize; // Assuming constant height
 
         // Incorporate canvas.widthRel and canvas.heightRel to stretch/compress text
         let widthRel =  1/ canvas.widthRel;  // Default to 1 if not provided
         let heightRel =  1 / canvas.heightRel;  // Default to 1 if not provided
 
         // Reduce font size until it fits within the rectangle
         while (
             (textWidth * widthRel > (this.width * canvas.resolutionFactor)) ||
             (textHeight * heightRel > (this.height * canvas.resolutionFactor) / 1.5)
         ) {
             fontSize -= 5;
             ctx.font = fontSize + 'px Verdana';
             textWidth = ctx.measureText(this.text).width;
             textHeight = fontSize;
         }
 
         // Apply the stretching/compression to the text's width and height
         textWidth *= widthRel;
         textHeight *= heightRel;
 
         // Calculate the position to center the text
         const textX = (this.x * canvas.resolutionFactor) + ((this.width * canvas.resolutionFactor) - textWidth) / 2;
         const textY = (this.y * canvas.resolutionFactor) + ((this.height * canvas.resolutionFactor) - textHeight) / 2 + fontSize * 0.8 / canvas.heightRel;
 
         // Set transform for text stretching
         ctx.save();
         ctx.scale(widthRel, heightRel);
 
         // Draw the text with adjusted position and scaling
         ctx.fillText(this.text, textX / widthRel, textY / heightRel);
 
         // Restore the canvas state to avoid affecting subsequent drawings
         ctx.restore();
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
        ctx.drawImage(img, (this.x*canvas.resolutionFactor),
                        (this.y*canvas.resolutionFactor),
                        (this.scaleWidth*canvas.resolutionFactor),
                        (this.scaleWidth*canvas.resolutionFactor)*(img.height/img.width))
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
        ctx.arc((this.x*canvas.resolutionFactor),
        (this.y*canvas.resolutionFactor),(this.radius*canvas.resolutionFactor), 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')'
        ctx.fill();
    }
}

export class Text extends DrawElement {
    constructor(canvasNumber, x, y, width, height, color, text) {
        super(canvasNumber);
        this.x = x;
        this.y = y;
        this.width = width;
        this.color = color;
        this.height = height;
        this.text = text;
    }

    draw(canvas, inputPacket) {
        let can = document.getElementById(canvas.id);
        let ctx = can.getContext("2d");

        // Set the fill color for the text
        ctx.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';

        // Start with a large font size
        let fontSize = 50 * canvas.resolutionFactor;
        ctx.font = fontSize + 'px Verdana';

        // Measure the text dimensions
        let textWidth = ctx.measureText(this.text).width;
        let textHeight = fontSize; // Assuming constant height

        // Incorporate canvas.widthRel and canvas.heightRel to stretch/compress text
        let widthRel =  1/ canvas.widthRel;  // Default to 1 if not provided
        let heightRel =  1 / canvas.heightRel;  // Default to 1 if not provided

        // Reduce font size until it fits within the rectangle
        while (
            (textWidth * widthRel > (this.width * canvas.resolutionFactor)) ||
            (textHeight * heightRel > (this.height * canvas.resolutionFactor) / 1.5)
        ) {
            fontSize -= 5;
            ctx.font = fontSize + 'px Verdana';
            textWidth = ctx.measureText(this.text).width;
            textHeight = fontSize;
        }

        // Apply the stretching/compression to the text's width and height
        textWidth *= widthRel;
        textHeight *= heightRel;

        // Calculate the position to center the text
        const textX = (this.x * canvas.resolutionFactor) + ((this.width * canvas.resolutionFactor) - textWidth) / 2;
        const textY = (this.y * canvas.resolutionFactor) + ((this.height * canvas.resolutionFactor) - textHeight) / 2 + fontSize * 0.8;

        // Set transform for text stretching
        ctx.save();
        ctx.scale(widthRel, heightRel);

        // Draw the text with adjusted position and scaling
        ctx.fillText(this.text, textX / widthRel, textY / heightRel);

        // Restore the canvas state to avoid affecting subsequent drawings
        ctx.restore();
    }
}

export class Polygon extends DrawElement {
    constructor(canvasNumber,polygonMap,color) {
        super(canvasNumber)
        this.polygonMap = polygonMap
        this.color = color
    }
    draw(canvas, inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")

        ctx.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')'
        ctx.lineWidth = canvas.resolutionFactor
        ctx.beginPath();
        ctx.moveTo(Math.floor((this.polygonMap[0].x+600)*canvas.resolutionFactor),Math.floor((this.polygonMap[0].y+337.5)*canvas.resolutionFactor));
        //alert((this.polygonMap[0].x+600)*canvas.resolutionFactor + " " + (this.polygonMap[0].y+337.5)*canvas.resolutionFactor)
        for (let i = 1;i < this.polygonMap.length;i++) {
            ctx.lineTo(Math.floor((this.polygonMap[i].x+600)*canvas.resolutionFactor),Math.floor((this.polygonMap[i].y+337.5)*canvas.resolutionFactor))
            //alert((this.polygonMap[i].x+600)*canvas.resolutionFactor + " " + (this.polygonMap[i].y+337.5)*canvas.resolutionFactor)
        }
        ctx.lineTo(Math.floor((this.polygonMap[0].x+600)*canvas.resolutionFactor),Math.floor((this.polygonMap[0].y+337.5)*canvas.resolutionFactor));
        ctx.closePath();
        ctx.fill()
        //ctx.stroke();
    }
}