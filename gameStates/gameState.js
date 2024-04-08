export class GameState {
    constructor(name,drawController) {
      this.name = name
      this.drawController = drawController
      this.drawCycle = 0
      this.draw = this.draw.bind(this)
    }
    load() {
      this.draw()
    }
    draw() {
    }
};