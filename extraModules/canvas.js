export class Canvas {
    //all "Rel" arguments are 0 to 1, id is a string, borderWidth is a # of pixels
    constructor(xRel,yRel,widthRel,heightRel,borderWidth,id) {
        this.id = id
        this.xRel = xRel
        this.yRel = yRel
        this.widthRel = widthRel
        this.heightRel = heightRel
        this.borderWidth = borderWidth
        document.querySelector('#bodyDiv').insertAdjacentHTML("beforeend",`<canvas id=${this.id}></canvas>`);
    }
    lineDraw(x1,y1,x2,y2) {
        let canvas = document.getElementById(this.id)
        let ctx = canvas.getContext("2d")
        //alert("x:" + window.innerWidth + " y:" + window.innerHeight)
        ctx.moveTo((x1*canvas.width)/(this.widthRel*1200),(y1*canvas.height)/(this.heightRel*675))
        ctx.lineTo((x2*canvas.width)/(this.widthRel*1200),(y2*canvas.height)/(this.heightRel*675))
        ctx.stroke()
    }
    rectDraw(x,y,width,height) {
        let canvas = document.getElementById(this.id)
        let ctx = canvas.getContext("2d")
        //alert("x:" + window.innerWidth + " y:" + window.innerHeight)
        ctx.beginPath()
        ctx.rect((x*canvas.width)/(this.widthRel*1200),
                (y*canvas.height)/(this.heightRel*675),
                (width*canvas.width)/(this.widthRel*1200),
                (height*canvas.height)/(this.heightRel*675))
        ctx.fill()
    }
    refresh() {
        let canvas = document.getElementById(this.id)
        let ctx = canvas.getContext("2d")
        if (window.innerHeight/window.innerWidth>9/16) {
            canvas.style = `
            position:absolute;
            border-style:solid;
            background-color:white;
            border-width:${this.borderWidth}px;
            width:${this.widthRel * (window.innerWidth) - this.borderWidth * 2}px;
            height:${this.heightRel * (window.innerWidth*9/16) - this.borderWidth * 2}px;
            left:${this.xRel * window.innerWidth}px;
            top:${this.yRel * (window.innerWidth*9/16) + (window.innerHeight - window.innerWidth*(9/16))/2}px;
            `;
            canvas.width = this.widthRel * (window.innerWidth) - this.borderWidth * 2
            canvas.height = this.heightRel * (window.innerWidth*9/16) - this.borderWidth * 2
        } else {
            canvas.style = `
            position:absolute;
            border-style:solid;
            background-color:white;
            border-width:${this.borderWidth}px;
            width:${this.widthRel * (window.innerHeight*16/9) - this.borderWidth * 2}px;
            height:${this.heightRel * (window.innerHeight) - this.borderWidth * 2}px;
            left:${this.xRel * (window.innerHeight*16/9) + (window.innerWidth - window.innerHeight*(16/9))/2}px;
            top:${this.yRel * window.innerHeight}px;
            `;
            canvas.width = this.widthRel * (window.innerHeight*16/9) - this.borderWidth * 2
            canvas.height = this.heightRel * (window.innerHeight) - this.borderWidth * 2
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
    }
}