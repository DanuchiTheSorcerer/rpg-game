import { InputController } from "./extraModules/inputController"
import { DrawController } from "./extraModules/drawController"
import { Canvas } from "./extraModules/canvas"


export class GameState {
    constructor(name,drawController) {
      this.name = name
      this.drawController = drawController
      this.nextState = null
      this.inputController = new InputController()
      this.updateFrame = this.updateFrame.bind(this);
      this.iterations = 0
      this.buttons = []
    }
    load(callback) {
      // reset state and then set the callback for when the state ends
      this.resetState();
      this.updateFrame(() => {
        callback();
      });
    }
    updateFrame(callback) {
      //get inputs
      let inputPacket = this.inputController.getInputPacket();
      //refresh canvas
      this.drawController.refreshAll(inputPacket);
      // run logic of the state
      this.logicFrame(inputPacket)
      // add to the iteration number
      this.iterations++
      // end state if needed, otherwise repeat
      if (this.nextState == null) {
        requestAnimationFrame(() => this.updateFrame(callback));
      } else {
        callback(); 
      }
    }
    logicFrame() {
    }
    resetState() {
      this.inputController = new InputController()
      this.drawController.resetElements()
    }
    addButton(x,y,width,height,func) {
      this.buttons.push({
        x:x,
        y:y,
        width:width,
        height:height,
        func:func
      })
    }
    processButtons(inputPacket) {
      for (let i = 0;i<this.buttons.length;i++) {
        if (inputPacket.mouseX > this.buttons[i].x &&
            inputPacket.mouseY > this.buttons[i].y &&
            inputPacket.mouseX < this.buttons[i].x + this.buttons[i].width &&
            inputPacket.mouseY < this.buttons[i].y + this.buttons[i].height &&
            inputPacket.leftMouse) {
          this.buttons[i].func()
        }
      }
    }
};



export class Title extends GameState {
    constructor() {
        super("title", new DrawController([
          new Canvas(0,0,1,1,1,"main")]));
    }
    logicFrame(inputPacket) {
      //reset and then create new draw elements
      this.drawController.resetElements()
      this.drawController.newSprite(0, 0, 0, 1200, "../sprites/gameTitle.png");
      this.drawController.newButton(0, 300, 350, 600, 100, [127, 63, 31], "Continue Game");
      this.drawController.newButton(0, 300, 500, 600, 100, [127, 63, 31], "Start New Game");
      // on first run add the logic of the buttons
      if (this.iterations == 0) {
        this.addButton(300, 350, 600, 100,() => {this.nextState = 1});
        this.addButton(300, 500, 600, 100,() => {this.nextState = 1});
      }

      //proccess buttons :/
      this.processButtons(inputPacket)
    }
};

export class World extends GameState {
  constructor() {
      super("world", new DrawController([
        new Canvas(0,0,1,1,1,"main")]));
  }
  logicFrame() {
    
  }
};

export class Dungeon extends GameState {
  constructor() {
      super("dungeon", new DrawController([
      new Canvas(0,0,0.25,1,1,"side"),
      new Canvas(0.25,0,0.75,0.67,1,"main"),
      new Canvas(0.25,0.67,0.75,0.33,1,"bottom")]));
  }
};