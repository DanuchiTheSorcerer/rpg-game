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
    }
    load(callback) {
      this.resetState();
      this.updateFrame(() => {
        callback();
      });
    }
    updateFrame(callback) {
      let inputPacket = this.inputController.getInputPacket();
      this.drawController.refreshAll(inputPacket);
      this.logicFrame()
      this.iterations++
      if (this.nextState == null) {
        requestAnimationFrame(() => this.updateFrame(callback)); // Calling itself recursively
      } else {
        callback(); // Call the callback function once animation stops
      }
    }
    logicFrame() {
    }
    resetState() {
      this.inputController = new InputController()
      this.drawController.resetElements()
    }
};



export class Title extends GameState {
    constructor() {
        super("title", new DrawController([
          new Canvas(0,0,1,1,1,"main")]));
    }
    logicFrame() {
      if (this.iterations == 0) {
        this.drawController.newSprite(0, 0, 0, 1200, "../sprites/gameTitle.png");
        this.drawController.newButton(0, 300, 400, 600, 100, [127, 63, 31], "Continue Game");
      }
      if (this.iterations == 100) {
        this.nextState = 1
      }
    }
};

export class World extends GameState {
  constructor() {
      super("world", new DrawController([
        new Canvas(0,0,1,1,1,"main")]));
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