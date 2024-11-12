import { InputController } from "./extraModules/inputController"
import { DrawController } from "./extraModules/drawController"
import { Canvas } from "./extraModules/canvas"
import { Creature, Player, Enemy } from "./extraModules/creatures"
import { StaticTile, EmptyTile, FloorTile } from "./extraModules/gameTiles"
import { Viewport } from "./extraModules/viewport"
import { DepthEngine } from "./extraModules/depthEngine"
import { clockTowerOne } from "./tileMaps/clockTowerOne"
import { clockTowerThree } from "./tileMaps/clockTowerThree"
import { clockTowerTwo } from "./tileMaps/clockTowerTwo"
import { field } from "./tileMaps/field"
import { field2 } from "./tileMaps/field2"


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
      this.frameCount = 0
      this.fps = 60
      this.tps = 60
      this.tickCount = 0
      this.logicRunning = false
    }
    load(callback) {
      this.resetState();
      this.startLogicUpdate();
      this.updateFrame(callback);
    }
    
    updateFrame(callback) {
      // Perform rendering updates if the frame count is at a reasonable rate
      if ((this.tps >35  && this.iterations%2 == 0)||(this.tps>55)||(this.tps>20 && this.iterations%3 == 0)) {
        this.frameCount++
        if (this.name == "world" && this.iterations >= 1) {
          this.drawController.resetElements()
          this.render(); // Perform rendering 
        }
        this.drawController.refreshAll(this.inputController.getInputPacket())
      }
        // Check if the state should end
      if (this.nextState == null) {
        requestAnimationFrame(() => this.updateFrame(callback));
      } else {
        this.stopLogicUpdate(); // Stop logic updates when the state ends
        callback();
      }
    }
    
    startLogicUpdate(interval = 1000 / 60) {
      this.logicInterval = setInterval(() => {
        this.runLogic();
      }, interval);
    
      this.frameCountInterval = setInterval(() => {
        this.fps = this.frameCount*4;
        this.frameCount = 0;
        this.tps = this.tickCount*4;
        this.tickCount = 0;
        //document.getElementById("console").innerText = "fps: " + this.fps + " " + "tps: " + this.tps
       }, 250);
    }
    
    runLogic() {
      this.logicRunning = true
      let inputPacket = this.inputController.getInputPacket();
      this.logicFrame(JSON.parse(JSON.stringify(inputPacket)));
      this.iterations++;
      this.tickCount++;
      this.logicRunning = false
    }
    
    stopLogicUpdate() {
      // Stop the logic updates
      if (this.logicInterval) {
        clearInterval(this.logicInterval);
        this.logicInterval = null;
      }
    }
    logicFrame(i) {
    }
    resetState() {
      let d = new Date()
      this.time = d.getTime()
      if (this.name == "world") {
        this.player = new Player(900,900)
        this.enemy = new Enemy(1800,1800)
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
        this.addButton(150,300,100,50,() => {localStorage.setItem("render","16")})
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
    super("world", new DrawController([new Canvas(0,0,1,1,"main"),new Canvas(0,0,0,0,"side"),new Canvas(0,0,0,0,"bottom")]));
    this.player = new Player(900,900)
    this.enemy = new Enemy(1800,1800)
    this.tiles = []
    this.floorTiles = []
    this.viewport = new Viewport()
    this.lastInputPacket = this.inputController.getInputPacket()
    this.renderDistance = parseInt(localStorage.getItem("render"))
    this.depthEngine = new DepthEngine()
    this.isInCombat = false
    this.playerTurn = true
  }
  createTile(xLocation,yLocation,isWall,bounceFactor,func,sideColor,topColor,height) {
    this.tiles[xLocation][yLocation] = new StaticTile(xLocation,yLocation,isWall,bounceFactor,func,sideColor,topColor,height)
  }
  createFloorTile(xLocation,yLocation,sideColor,topColor) {
    this.floorTiles[xLocation][yLocation] = new FloorTile(xLocation,yLocation,sideColor,topColor)
  }
  bottomCanvasText() {
    let text 
    if (this.playerTurn) {
      if (this.player.currentAction != null) {
        text = "Performing " + this.player.currentAction
      } else {
        text = " "
      }
    } else {
      if (this.enemy.currentAction != null) {
      text = "Enemy is performing " + this.enemy.currentAction
      } else {
        text = " "
      }
    }
    return text
  }
  render() {
    let ptx = Math.floor((this.viewport.x+600)/100)
    let pty = Math.floor((this.viewport.y+337.5)/100)
    for (let i = Math.max(0, ptx - this.renderDistance);i<ptx;i++) {
      for (let j = Math.max(0, pty - this.renderDistance/2);j<pty;j++) {
        if (!this.floorTiles[i][j].isEmpty) {
          this.drawFloorTile(this.floorTiles[i][j])
        }
      }
    }
    for (let i = Math.min(ptx+this.renderDistance,999);i>=ptx;i--) {
      for (let j = Math.max(0, pty - this.renderDistance/2);j<pty;j++) {
        if (!this.floorTiles[i][j].isEmpty) {
          this.drawFloorTile(this.floorTiles[i][j])
        }
      }
    }
    for (let i = Math.max(0, ptx - this.renderDistance);i<ptx;i++) {
      for (let j = Math.min(pty+this.renderDistance/2,999);j>=pty;j--) {
        if (!this.floorTiles[i][j].isEmpty) {
          this.drawFloorTile(this.floorTiles[i][j])
        }
      }
    }
    for (let i = Math.min(ptx+this.renderDistance,999);i>=ptx;i--) {
      for (let j = Math.min(pty+this.renderDistance/2,999);j>=pty;j--) {
        if (!this.floorTiles[i][j].isEmpty) {
          this.drawFloorTile(this.floorTiles[i][j])
        }
      }
    }

    if (this.isInCombat) {
      if (this.player.currentAction == "move") {
        let size = this.player.movementSpeed * 100
        this.drawSprite(this.player.position.x-size,this.player.position.y-size,100,size*2,size*2,"../sprites/moveDistanceMarker.png")
      }
      this.drawSprite(this.player.targetPos.x-25,this.player.targetPos.y-25,100,50,50,"../sprites/character.png")
      this.drawController.newRect(1,0,0,1200,675,[100,100,100])
      this.drawController.newRect(1,40,10,1120,655,[81, 139, 145])
      this.drawController.newSprite(1,200,25,800,"../sprites/hourglass.png")
      this.drawController.newText(1,450,200,350,100,[255,255,255],this.player.warp + "%")
      this.drawController.newText(1,60,250,1080,100,[255,255,255],"Actions: " + this.player.actions)
      this.drawController.newText(1,60,300,1080,100,[255,255,255],"Stance: " + this.player.stance + "%")
      this.drawController.newText(1,60,350,1080,100,[255,255,255],"Move Distance: " + Math.floor(this.player.movementSpeed*10)/10 + "m")
      if (this.playerTurn) {
        this.drawController.newRect(2,0,0,1200,675,[100,100,255])
      } else {
        this.drawController.newRect(2,0,0,1200,675,[255,0,0])
      }
      this.drawController.newText(2,0,0,1200,675,[0,0,0],this.bottomCanvasText())
    }
    this.drawSprite(this.enemy.position.x-50,this.enemy.position.y-50,100,100,100,"../sprites/evilCharacter.png")
    this.drawSprite(this.player.position.x-50,this.player.position.y-50,100,100,100,"../sprites/character.png")
    this.drawSprite(2250,250,100,100,100,"../sprites/character.png")

    for (let i = Math.max(0, ptx - this.renderDistance);i<ptx;i++) {
      for (let j = Math.max(0, pty - this.renderDistance/2);j<pty;j++) {
        if (!this.tiles[i][j].isEmpty) {
          this.drawTile(this.tiles[i][j])
          this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
        }
        
      }
    }
    for (let i = Math.min(ptx+this.renderDistance,999);i>=ptx;i--) {
      for (let j = Math.max(0, pty - this.renderDistance/2);j<pty;j++) {
        if (!this.tiles[i][j].isEmpty) {
          this.drawTile(this.tiles[i][j])
          this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
        }
      }
    }
    for (let i = Math.max(0, ptx - this.renderDistance);i<ptx;i++) {
      for (let j = Math.min(pty+this.renderDistance/2,999);j>=pty;j--) {
        if (!this.tiles[i][j].isEmpty) {
          this.drawTile(this.tiles[i][j])
          this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
        }
      }
    }
    for (let i = Math.min(ptx+this.renderDistance,999);i>=ptx;i--) {
      for (let j = Math.min(pty+this.renderDistance/2,999);j>=pty;j--) {
        if (!this.tiles[i][j].isEmpty) {
          this.drawTile(this.tiles[i][j])
          this.tiles[i][j].func(this.tiles[i][j].position.x*100,this.tiles[i][j].position.y*100)
        }
      }
    }
  }
  drawTile(tile) {
    let camera = this.viewport
    let cube = this.depthEngine.dimensionDownCube(camera.x,camera.y,camera.z,tile.position.x*100-600,tile.position.y*100-337.5,100,100,tile.height*100)
    for (let i = 0; i < cube.length;i++) {
      if (i==0) {
        this.drawController.newPolygon(0,cube[i],tile.topColor)
      } else {
        this.drawController.newPolygon(0,cube[i],tile.sideColor)
      }
    }
    /*let camera = this.viewport
    for (let j = 0;j<tile.height;j++) {
      let cube
      if (j ==tile.height-1) {
        cube = this.depthEngine.dimensionDownCube(camera.x,camera.y,camera.z,tile.position.x*100-600,tile.position.y*100-337.5,100+j*100,100,"none")
      } else {
        cube = this.depthEngine.dimensionDownCube(camera.x,camera.y,camera.z,tile.position.x*100-600,tile.position.y*100-337.5,100+j*100,100,"top")
      }
      for (let i = 0; i < cube.length;i++) {
        if (j == tile.height -1 && !i) {
          this.drawController.newPolygon(0,cube[i],tile.topColor)
        } else {
          this.drawController.newPolygon(0,cube[i],tile.sideColor)
        }
      }
    }*/
  }
  drawFloorTile(tile) {
    let camera = this.viewport
    let cube = this.depthEngine.dimensionDownCube(camera.x,camera.y,camera.z,tile.position.x*100-600,tile.position.y*100-337.5,0,100)
    this.drawController.newPolygon(0,cube[0],tile.topColor)
  }
  importTileMap(map,dx,dy) {
    for (let ry = 0;ry<map.length;ry++) {
      for (let rx = 0;rx<map[ry].length;rx++) {
        if (map[ry][rx] == 10) {
          this.createTile(rx + dx,ry+dy,true,1,(x,y) => {},[110,65,5],[50,150,50],1)
        }
        if (map[ry][rx] == 20) {
          this.createFloorTile(rx + dx,ry+dy,[110,65,5],[40, 212, 40])
        }
        if (map[ry][rx] == 21) {
          this.createTile(rx + dx,ry+dy,true,0,(x,y) => {},[143, 125, 90],[201, 177, 129],10)
        }
        if (map[ry][rx] == 22) {
          this.createTile(rx + dx,ry+dy,true,0,(x,y) => {},[97, 97, 97],[168, 168, 168],6)
        }
        if (map[ry][rx] == 11) {
          this.createFloorTile(rx + dx,ry+dy,[201, 177, 129],[201, 177, 129])
        }
        if (map[ry][rx] == 12) {
          this.createTile(rx + dx,ry+dy,false,0,(x,y) => {},[97, 97, 97],[168, 168, 168],2)
        }
        if (map[ry][rx] == 13) {
          this.createTile(rx + dx,ry+dy,false,0,(x,y) => {if (this.player.tilePos.x == x/100 && this.player.tilePos.y == y/100) {this.player.teleport(10550,450)}},[97, 97, 97],[168, 168, 168],1)
        }
        if (map[ry][rx] == 17) {
          this.createTile(rx + dx,ry+dy,false,0,(x,y) => {if (this.player.tilePos.x == x/100 && this.player.tilePos.y == y/100) {this.player.teleport(20550,450)}},[97, 97, 97],[168, 168, 168],1)
        }
        if (map[ry][rx] == 18) {
          this.createTile(rx + dx,ry+dy,false,0,(x,y) => {if (this.player.tilePos.x == x/100 && this.player.tilePos.y == y/100) {this.player.teleport(10350,1050)}},[97, 97, 97],[168, 168, 168],1)
        }
        if (map[ry][rx] == 14) {
          this.createTile(rx + dx,ry+dy,false,0,(x,y) => {},[97, 97, 97],[168, 168, 168],2)
        }
        if (map[ry][rx] == 15) {
          this.createTile(rx + dx,ry+dy,false,0,(x,y) => {},[97, 97, 97],[168, 168, 168],3)
        }
        if (map[ry][rx] == 16) {
          this.createTile(rx + dx,ry+dy,false,0,(x,y) => {if (this.player.tilePos.x == x/100 && this.player.tilePos.y == y/100) {this.player.teleport(350,1050)}},[97, 97, 97],[168, 168, 168],4)
        }
      }
    }
  }
  drawSprite(x,y,z,width,height,sprite) {
    let spriteDimensions = this.depthEngine.dimensionDownRect(this.viewport.x,this.viewport.y,this.viewport.z,x-600,y-337.5,width,height,z)
    this.drawController.newSprite(0,spriteDimensions.x+600,spriteDimensions.y+337.5,spriteDimensions.width,sprite)
  }
  combat(mode) {
    this.isInCombat = mode
    if (!mode) {
      //leave combat
      this.drawController.canvases[0].xRel = 0
      this.drawController.canvases[0].heightRel = 1
      this.drawController.canvases[0].widthRel = 1
      this.drawController.canvases[1].heightRel = 0
      this.drawController.canvases[1].widthRel = 0
      this.drawController.canvases[2].xRel = 0
      this.drawController.canvases[2].yRel = 0
      this.drawController.canvases[2].widthRel = 0
      this.drawController.canvases[2].heightRel = 0
      this.renderDistance = parseInt(localStorage.getItem("render"))
      this.playerTurn = false
    } else {
      //enter combat
      this.drawController.canvases[0].xRel = 0.25
      this.drawController.canvases[0].heightRel = 0.75 
      this.drawController.canvases[0].widthRel = 0.75
      this.drawController.canvases[1].heightRel = 1
      this.drawController.canvases[1].widthRel = 0.25
      this.drawController.canvases[2].xRel = 0.25
      this.drawController.canvases[2].yRel = 0.75
      this.drawController.canvases[2].widthRel = 0.75
      this.drawController.canvases[2].heightRel = 0.25
      this.renderDistance = 20
      this.viewport.z = 2000
      this.player.targetPos.x = this.player.position.x
      this.player.targetPos.y = this.player.position.y
      this.player.stance = 40
      this.enemy.stance = 40
      this.playerTurn = true
      this.player.startTurn()
    }
  }
  tickPlayer(inputPacket) {
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
    if (inputPacket.keys.indexOf("KeyC") != -1) {
      this.combat(true)
    }
    this.player.walk(playerDx,playerDy)
    this.player.updatePos(this.tiles)
  }
  tickCreatures() {

  }
  runCombatTurn(inputPacket) {
    if (this.playerTurn) {
      this.player.takeTurn(inputPacket,this.viewport,this.enemy,this.lastInputPacket)
      if (inputPacket.keys.indexOf("KeyV") != -1) {
        this.combat(false)
      }
      if (inputPacket.keys.indexOf("KeyE") != -1 && !(this.lastInputPacket.keys.indexOf("KeyE") != -1) && this.player.currentAction == null) {
        this.enemy.startTurn()
        this.playerTurn = false
      }
      this.player.walk(this.player.targetPos.x-this.player.position.x,this.player.targetPos.y-this.player.position.y)
      this.player.updatePos(this.tiles)
    } else {
      this.enemy.takeTurn(this.player)
      this.enemy.walk(this.enemy.targetPos.x-this.enemy.position.x,this.enemy.targetPos.y-this.enemy.position.y)
      this.enemy.updatePos(this.tiles)
      if (this.enemy.currentAction == null && this.enemy.actions == 0) {
        this.player.startTurn()
        this.playerTurn = true
      }
    } 
  }
  logicFrame(inputPacket) {
    if (this.iterations ==0) {
      //add border tiles
      for (let i = 0;i<1000;i++) {
        this.tiles[i] = []
        this.floorTiles[i] = []
        for (let j = 0;j<1000;j++) {
          this.tiles[i][j] = new EmptyTile(i,j)
          this.floorTiles[i][j] = new EmptyTile(i,j)
          if (i == 0 || j == 0 || i == 999 || j == 999) {
            this.createTile(i,j,true,0,(x,y) => {},[0,0,0],[0,0,0],1)
          }
        }
      }
      this.importTileMap(clockTowerOne,1,1)
      this.importTileMap(clockTowerTwo,101,1)
      this.importTileMap(clockTowerThree,201,1)
      this.importTileMap(field,17,1)
      this.importTileMap(field2,1,17)
    }
    
    if (this.isInCombat) {
      this.runCombatTurn(inputPacket)
    } else {
      this.tickPlayer(inputPacket)
    }
    
    this.viewport.moveTo(this.player.position.x-600,this.player.position.y-337.5)
    this.lastInputPacket = JSON.parse(JSON.stringify(inputPacket))
    document.getElementById("console").innerText = this.enemy.stance
  }
};