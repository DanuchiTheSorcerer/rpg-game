import { InputController } from "../extraModules/inputController"
export class GameState {
    constructor(name,drawController) {
      this.name = name
      this.drawController = drawController
      this.drawCycle = 0
      this.draw = this.draw.bind(this)
      this.inputController = new InputController()
    }
    load() {
      this.drawController.newButton(1,100,200,300,200)
      this.draw()
    }
    draw() {
      this.logicFrame()
      //alert(this.inputController.getInputPacket().mouseX + " " + this.inputController.getInputPacket().mouseY)
      this.drawController.refreshAll(this.inputController.getInputPacket())
      window.requestAnimationFrame(this.draw)
    }
    logicFrame() {
    }
    getInputPacket() {
      
      return {

      }
    }
};