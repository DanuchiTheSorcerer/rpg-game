export class Canvas {
    //all "Rel" arguments are 0 to 1, id is a string
    constructor(xRel,yRel,widthRel,heightRel,borderWidth,id) {
        this.id = id
        this.xRel = xRel
        this.yRel = yRel
        this.widthRel = widthRel
        this.heightRel = heightRel
        this.borderWidth = borderWidth
        document.querySelector('#bodyDiv').insertAdjacentHTML("beforeend",`<canvas id=${this.id}></canvas>`);
    }
    refresh() {
        document.getElementById(this.id).style = `
        position:absolute;
        border-style:solid;
        border-width:${this.borderWidth}px;
        width:${this.widthRel * window.innerWidth - this.borderWidth * 2}px;
        height:${this.heightRel * window.innerHeight - this.borderWidth * 2}px;
        left:${this.xRel * window.innerWidth}px;
        top:${this.yRel * window.innerHeight}px;
        `;
    }
}