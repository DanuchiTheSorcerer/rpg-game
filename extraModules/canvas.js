export class Canvas {
    //all "Rel" arguments are 0 to 1, id is a string, borderWidth is a # of pixels
    constructor(xRel,yRel,widthRel,heightRel,id) {
        this.id = id
        this.xRel = xRel
        this.yRel = yRel
        this.widthRel = widthRel
        this.heightRel = heightRel
        this.resolutionFactor = localStorage.getItem("resolution")
    }
    createElement() {
        document.querySelector('#bodyDiv').insertAdjacentHTML("beforeend",`<canvas id=${this.id}></canvas>`);
    }
    refresh() {
        let canvas = document.getElementById(this.id)
        let ctx = canvas.getContext("2d")
        // reset canvas properties based on if it is portrait or landscape
        if (window.innerHeight/window.innerWidth>9/16) {
            canvas.style = `
            position:absolute;
            border-style:solid;
            background-color:white;
            border-width:${0}px;
            width:${this.widthRel * (window.innerWidth)}px;
            height:${this.heightRel * (window.innerWidth*9/16)}px;
            left:${this.xRel * window.innerWidth}px;
            top:${this.yRel * (window.innerWidth*9/16) + (window.innerHeight - window.innerWidth*(9/16))/2}px;
            `;
            canvas.width = 1200 * this.resolutionFactor * this.widthRel
            canvas.height = 675 * this.resolutionFactor * this.heightRel
        } else {
            canvas.style = `
            position:absolute;
            border-style:solid;
            background-color:white;
            border-width:${0}px;
            width:${this.widthRel * (window.innerHeight*16/9)}px;
            height:${this.heightRel * (window.innerHeight)}px;
            left:${this.xRel * (window.innerHeight*16/9) + (window.innerWidth - window.innerHeight*(16/9))/2}px;
            top:${this.yRel * window.innerHeight}px;
            `;
            canvas.width = 1200 * this.resolutionFactor * this.widthRel
            canvas.height = 675 * this.resolutionFactor * this.heightRel
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);   
    }
}