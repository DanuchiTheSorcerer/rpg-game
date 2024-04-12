export class GameState {
    constructor(name,drawController) {
      this.name = name
      this.drawController = drawController
      this.drawCycle = 0
      this.draw = this.draw.bind(this)
    }
    load() {
      alert("game state started loading")
      this.drawController.newButton("main",10,10,100,100)
      this.draw()
    }
    draw() {
    }
};