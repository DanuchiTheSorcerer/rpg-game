export class Canvas {
    //all "Rel" arguments are 0 to 1, id is a string
    constructor(xRel,yRel,widthRel,heightRel,id) {
        this.id = id
        this.xRel = xRel
        this.yRel = yRel
        this.widthRel = widthRel
        this.heightRel = heightRel
        document.querySelector('#bodyDiv').insertAdjacentHTML("beforeend",`<canvas id=${this.id}></canvas>`);
    }
    refresh() {
        document.getElementById(this.id).innerHTML = `<canvas id=${this.id} style="
        position:absolute;
        border-style:solid;
        border-width:20px;
        width:${this.widthRel * window.innerWidth}px;
        height:${this.heightRel * window.innerHeight}px;
        left:${this.xRel * window.innerWidth}px;
        top:${this.yRel * window.innerHeight}px;
        "></canvas>`;
    }
}