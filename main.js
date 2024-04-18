import { Title } from "./gameStates/title";
import { Dungeon } from "./gameStates/dungeon";

class Game {
  constructor() {
    this.gameStates = [];
    this.activeGameState =  null;
  }
  init() {
    this.createGameStates()
    this.loadGameState(1)
  }
  createGameStates() {
    this.gameStates.push(new Title())
    this.gameStates.push(new Dungeon())
  }
  loadGameState(newLoadedState) {
    //takes in a number
    //0 = title, 1 = world, 2 = dungeon
    this.activeGameState = newLoadedState
    this.gameStates[newLoadedState].load()
  }
};

let game = new Game()
game.init()


/*  */

/////--------------------COOKIE DISCOVERIES(found Mar 20, 2024)------------------------------------
//cookies: form "key=value"
//document.cookie = "key=value" to append a cookie or change a cookie with the same key
//document.cookie also returns string of all cookies, separated by semicolons and spaces
  //You can use the following string manipulation
  //var cookieStr = document.cookie
  //var cookies = cookieStr.split('; ')
  //cookies is an array with all of the individual cookies
/* Cookie deleting function I definetly didn't steal
function deleteAllCookies() {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
    if (eqPos=1) {
      name=""
    }
    document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
  }
}
 */