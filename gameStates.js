import { InputController } from "./extraModules/inputController"
import { DrawController } from "./extraModules/drawController"
import { Canvas } from "./extraModules/canvas"
import { Player, NPC } from "./extraModules/creatures"
import { StaticTile } from "./extraModules/gameTiles"
import { Viewport } from "./extraModules/viewport"
import { testMap } from "./tileMaps/testMap"
import { DepthEngine } from "./extraModules/depthEngine"


export class GameState {
    constructor(name,drawController) {
      this.name = name
      this.drawController = drawController
      this.nextState = null
      this.inputController = new InputController()
      this.updateFrame = this.updateFrame.bind(this);
      this.iterations = 0
      this.logicInterval = null
      this.buttons = []
    }
    load(callback) {
      // reset state and then set the callback for when the state ends
      this.resetState();
      this.updateFrame(() => {
        callback();
      });
      this.startLogicUpdate()
    }
    updateFrame(callback) {
      // Perform rendering updates
      this.drawController.refreshAll(this.inputController.getInputPacket());
  
      // Check if the state should end
      if (this.nextState == null) {
        requestAnimationFrame(() => this.updateFrame(callback));
      } else {
        this.stopLogicUpdate(); // Stop logic updates when the state ends
        callback();
      }
    }
    startLogicUpdate(interval = 1000 / 60) {
      // Start logic updates at a fixed interval (e.g., 60 times per second)
      this.logicInterval = setInterval(() => {
        this.runLogic();
      }, interval);
    }
  
    runLogic() {
      let inputPacket = this.inputController.getInputPacket();
      this.logicFrame(inputPacket);
      this.iterations++;
    }
  
    stopLogicUpdate() {
      // Stop the logic updates
      if (this.logicInterval) {
        clearInterval(this.logicInterval);
        this.logicInterval = null;
      }
    }
    logicFrame() {
    }
    resetState() {
      if (this.name == "world") {
        this.player = new Player(150,150)
      }
      this.inputController = new InputController()
      this.removeButtons()
      this.drawController.resetElements()
      this.iterations = 0
      this.nextState = null
      document.getElementById("bodyDiv").innerHTML = " "
      this.drawController.createElements()
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
    removeButtons() {
      this.buttons = []
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
    get saveFile() {
      let save = null
      let strSave = localStorage.getItem("save")
      if (strSave != null) {
        save = JSON.parse(strSave)
      }
      return save
    }
    set saveFile(save) {
      localStorage.setItem("save",JSON.stringify(save))
      if (save == null) {
        localStorage.removeItem("save")
      }
    }
};



export class Title extends GameState {
    constructor() {
        super("title", new DrawController([
          new Canvas(0,0,1,1,"main")]));
        this.isOnOptions = false
    }
    logicFrame(inputPacket) {
      //reset and then create new draw elements
      this.drawController.resetElements()
      if (!this.isOnOptions) {
        this.drawController.newSprite(0, 0, 0, 1200, "../sprites/gameTitle.png");
        this.drawController.newButton(0, 300, 350, 600, 100, [127, 63, 31], "Continue Game");
        this.drawController.newButton(0, 300, 500, 600, 100, [127, 63, 31], "Start New Game");
        this.drawController.newButton(0, 25, 550, 250, 100, [127, 63, 31], "Options");
      }
      if (this.isOnOptions) {
        this.drawController.newButton(0,25,25,250,100,[127,0,255],"Go Back")
        this.addButton(25,25,250,100,() => {this.isOnOptions = false;this.removeButtons();
          this.pressedFunnyButton = false
          this.addButton(300, 350, 600, 100,() => {this.nextState = 1});
          this.addButton(300,500,600,100, () => {
            this.pressedFunnyButton = true
            this.addButton(300, 200, 600, 100,() => {this.nextState = 1;this.saveFile = null});
          })
          this.addButton(25,550,250,100,() => {this.isOnOptions = true;this.removeButtons()})
        })
        this.drawController.newButton(0,25,150,100,50,[127,0,255],"Res 1")
        this.drawController.newButton(0,150,150,100,50,[127,0,255],"Res 2")
        this.drawController.newButton(0,275,150,100,50,[127,0,255],"Res 3")
        this.drawController.newButton(0,400,150,100,50,[127,0,255],"Res 4")
        this.drawController.newButton(0,525,150,100,50,[127,0,255],"Res 5")
        this.addButton(25,150,100,50,() => {localStorage.setItem("resolution","0.5")})
        this.addButton(150,150,100,50,() => {localStorage.setItem("resolution","1.5")})
        this.addButton(275,150,100,50,() => {localStorage.setItem("resolution","2.5")})
        this.addButton(400,150,100,50,() => {localStorage.setItem("resolution","3.5")})
        this.addButton(525,150,100,50,() => {localStorage.setItem("resolution","4.5")})
        this.drawController.newButton(0,25,300,100,50,[127,0,255],"RD 1")
        this.drawController.newButton(0,150,300,100,50,[127,0,255],"RD 2")
        this.drawController.newButton(0,275,300,100,50,[127,0,255],"RD 3")
        this.drawController.newButton(0,400,300,100,50,[127,0,255],"RD 4")
        this.drawController.newButton(0,525,300,100,50,[127,0,255],"RD 5")
        this.addButton(25,300,100,50,() => {localStorage.setItem("render","8")})
        this.addButton(150,300,100,50,() => {localStorage.setItem("render","20")})
        this.addButton(275,300,100,50,() => {localStorage.setItem("render","45")})
        this.addButton(400,300,100,50,() => {localStorage.setItem("render","70")})
        this.addButton(525,300,100,50,() => {localStorage.setItem("render","90")})
      }
      // on first run add the logic of the buttons
      if (this.iterations == 0) {
        this.pressedFunnyButton = false
        this.addButton(300, 350, 600, 100,() => {this.nextState = 1});
        this.addButton(300,500,600,100, () => {
          this.pressedFunnyButton = true
          this.addButton(300, 200, 600, 100,() => {this.nextState = 1;this.saveFile = null});
        })
        this.addButton(25,550,250,100,() => {this.isOnOptions = true;this.removeButtons()})
      }
      if (this.pressedFunnyButton) {
        this.drawController.newButton(0, 300, 200, 600, 100, [127, 63, 31], "Are you sure?")
      }

      //proccess buttons :/
      this.processButtons(inputPacket)
    }
};

export class World extends GameState {
  constructor() {
      super("world", new DrawController([
        new Canvas(0,0,1,1,"main")]));
      this.player = new Player(150,150)
      this.tiles = []
    this.viewport = new Viewport()
    this.npcs = []
    this.lastInputPacket = this.inputController.getInputPacket()
    this.renderDistance = localStorage.getItem("render")
    this.depthEngine = new DepthEngine()
  }
  createTile(xLocation,yLocation,isWall,bounceFactor,func) {
    this.tiles[xLocation][yLocation] = new StaticTile(xLocation,yLocation,isWall,bounceFactor,func)
  }
  processTiles() {
    let ptx = this.player.tilePos.x
    let pty = this.player.tilePos.y
    for (let i = Math.max(0, ptx - this.renderDistance);i<ptx;i++) {
      for (let j = Math.max(0, pty - this.renderDistance);j<pty;j++) {
        this.drawTile(this.tiles[i][j])
        this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
      }
    }
    for (let i = Math.min(ptx+this.renderDistance,99);i>=ptx;i--) {
      for (let j = Math.max(0, pty - this.renderDistance);j<pty;j++) {
        this.drawTile(this.tiles[i][j])
        this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
      }
    }
    for (let i = Math.max(0, ptx - this.renderDistance);i<ptx;i++) {
      for (let j = Math.min(pty+this.renderDistance,99);j>=pty;j--) {
        this.drawTile(this.tiles[i][j])
        this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
      }
    }
    for (let i = Math.min(ptx+this.renderDistance,99);i>=ptx;i--) {
      for (let j = Math.min(pty+this.renderDistance,99);j>=pty;j--) {
        this.drawTile(this.tiles[i][j])
        this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
      }
    }
  }
  drawCircle(x,y,radius,color) {
    this.drawController.newCircle(0,(x - this.viewport.x),(y - this.viewport.y),radius,color)
  }
  drawRect(x,y,width,height,color) {
    this.drawController.newRect(0,(x - this.viewport.x),(y - this.viewport.y),width,height,color)
  }
  drawTile(tile) {
    let camera = this.viewport
    if (tile.isWall) {
      let cube = this.depthEngine.dimensionDownCube(camera.x,camera.y,camera.z,tile.position.x*100-600,tile.position.y*100-337.5,100,100)
      for (let i = 0; i < cube.length;i++) {
        this.drawController.newPolygon(0,cube[i],[255,0,0])
      }
    }
    
    
  }
  importTileMap(map) {
    for (let ry = 0;ry<map.length;ry++) {
      for (let rx = 0;rx<map[ry].length;rx++) {
        if (map[ry][rx] == 10) {
          this.createTile(rx,ry,true,0,(x,y) => {})
        }
        if (map[ry][rx] == 20) {
          this.createTile(rx,ry,false,0,(x,y) => {})
        }
      }
    }
  }
  logicFrame(inputPacket) {
    this.drawController.resetElements()
    this.drawController.newRect(0,0,0,1200,675,[0,100,255])
    if (this.iterations ==0) {
      //add border tiles
      for (let i = 0;i<100;i++) {
        this.tiles[i] = []
        for (let j = 0;j<100;j++) {
          this.createTile(i,j,false,0,(x,y) => {})
          if (i == 0 || j == 0 || i == 99 || j == 99) {
            this.createTile(i,j,true,0,(x,y) => {})
          }
        }
      }
      this.importTileMap(testMap)
      this.createTile(7,13,false,0,(x,y) => {if (this.player.tilePos.x == x/100 && this.player.tilePos.y == y/100) {this.nextState = 2}})
      //npcs go here
      this.npcs.push(new NPC(600,600,["Here are the controls","WASD to move","I and K to zoom","And enter to talk!"]))
      this.npcs.push(new NPC(1200,600,["Wanna know a secret?","The R key does something cool","Just dont hold it down"]))
    }
    let playerDx = 0
    let playerDy = 0
    if (inputPacket.keys.indexOf("KeyS") != -1) {
      playerDy++
    }
    if (inputPacket.keys.indexOf("KeyW") != -1) {
      playerDy--
    }
    if (inputPacket.keys.indexOf("KeyD") != -1) {
      playerDx++
    }
    if (inputPacket.keys.indexOf("KeyA") != -1) {
      playerDx--
    }
    if (inputPacket.keys.indexOf("KeyI") != -1) {
      this.viewport.zoomOut()
    }
    if (inputPacket.keys.indexOf("KeyK") != -1) {
      this.viewport.zoomIn()
    }
    //update player
    this.player.walk(playerDx,playerDy)
    this.player.updatePos(this.tiles)
    this.viewport.moveTo(this.player.position.x-600,this.player.position.y-337.5)
    //draw tiles
    this.processTiles()
    //draw npcs
    for (let i = 0;i<this.npcs.length;i++) {
      this.npcs[i].updatePos(this.tiles)
      this.drawCircle(this.npcs[i].position.x,this.npcs[i].position.y,100,[255,127,63])
    }
    //draw player
    this.drawCircle(this.player.position.x,this.player.position.y,25,[255,255,0])
    this.drawCircle(this.player.position.x+20*Math.cos(this.player.rotation),this.player.position.y+20*Math.sin(this.player.rotation),5,[171,127,171]) // player eye
    //dialogue logic
    if (inputPacket.keys.indexOf("Enter") && !this.lastInputPacket.keys.indexOf("Enter")) {
      this.player.updateDialogue(this.npcs)
    }
    let dialogue = this.player.getDialogue()
    if (dialogue) {
      this.drawController.newButton(0,150,475,900,175,[40,117,76],dialogue)
    }
    document.getElementById("console").innerText = this.player.tilePos.x + " " + this.player.tilePos.y
    this.lastInputPacket = inputPacket
  }
};

export class Dungeon extends GameState {
  constructor() {
      super("dungeon", new DrawController([
      new Canvas(0,0,0.25,1,"side"),
      new Canvas(0.25,0,0.75,0.76,"main"),
      new Canvas(0.25,0.76,0.75,0.24,"bottom")]));
  }
  logicFrame(inputPacket) {
    this.drawController.resetElements()
    this.drawController.newRect(1,0,0,900,513,[123,193,194])
    this.drawController.newRect(1,3,3,894,507,[255,255,255])
    this.drawController.newRect(0,0,0,300,675,[21,193,194])
    this.drawController.newRect(0,3,3,294,669,[255,255,255])
    this.drawController.newRect(2,0,0,900,162,[123,32,194])
    this.drawController.newRect(2,3,3,894,156,[255,255,255])
    this.drawController.newText(0,10,10,280,100,[0,0,255],"View Stats")
    this.drawController.newText(0,10,10,280,300,[0,0,255],"Inventory")
  }
};