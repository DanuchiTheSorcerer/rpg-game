export class GameState {
    constructor(name,canvases) {
      this.name = name
      this.canvases = canvases
    }
    load() {
      document.querySelector("#bodyDiv").innerHTML = ""
      for (let i = 0;i<this.canvases.length;i++) {
        let canvas = this.canvases[i]
        document.querySelector('#bodyDiv').insertAdjacentHTML("beforeend",`<canvas id="${canvas.id}" style="
        position:absolute;
        width:${canvas.widthRel};
        height:${canvas.heightRel};
        left:${canvas.xRel};
        top:${canvas.yRel};
        "></canvas>`);
      }
      this.draw()
    }
    draw() {
      
    }
};