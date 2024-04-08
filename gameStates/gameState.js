export class GameState {
    constructor(name,canvasData) {
      this.name = name
      this.canvasData = canvasData
      this.draw = this.draw.bind(this)
    }
    load() {
      this.draw()
    }
    draw() {
    }
};