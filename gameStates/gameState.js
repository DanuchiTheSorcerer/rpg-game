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
      this.drawController.newButton(0,300,400,600,100,[127,63,31],"Continue Game")
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