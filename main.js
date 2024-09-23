import { Title, World } from "./gameStates";

class Game {
  constructor() {
    this.gameStates = [];
    this.activeGameState =  null;
  }
  init() {
    this.createGameStates()
    this.loadGameState(0)
  }
  createGameStates() {
    this.gameStates.push(new Title())
    this.gameStates.push(new World())
  }
  loadGameState(newLoadedState) {
    //takes in a number
    //0 = title, 1 = world
    this.activeGameState = newLoadedState
    this.gameStates[newLoadedState].load(() => {
      this.loadGameState(this.gameStates[this.activeGameState].nextState);
    });
  }
};

let game = new Game()
game.init()