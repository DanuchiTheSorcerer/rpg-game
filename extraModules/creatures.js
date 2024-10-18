export class Creature {
    constructor(spawnX,spawnY) {
        this.position = {x:spawnX,y:spawnY}
        this.speed = {x:0,y:0}
        this.movementSpeedFactor = 5
        // movementSpeedFactor / friction - movementSpeedFactor = terminal velocity
        this.friction = 0.2
        this.tilePos = {x:Math.floor(spawnX/100),y:Math.floor(spawnY/100)}
        this.targetPos = {x:0,y:0}
        this.actions = 0
        this.warp = 1000
        this.movementSpeed = 0
        this.currentAction = null
    }
    teleport(x,y) {
        this.position = {x:x,y:y}
        this.tilePos = {x:Math.floor(this.position.x/100),y:Math.floor(this.position.y/100)}
    }
    move(dx,dy,collision) {
        let sideVector = this.vectorToTileEdge(dx,dy)
        //alert(sideVector.x + " " + sideVector.y + " " + sideVector.dir)
        let remainingVector = {x:dx-sideVector.x,y:dy-sideVector.y}
        this.position = {x:this.position.x+sideVector.x,y:this.position.y+sideVector.y}
        if (sideVector.dir == "left") {
            let bounce = collision[this.tilePos.x-1][this.tilePos.y].bounceFactor
            if (!collision[this.tilePos.x-1][this.tilePos.y].isWall) {
                this.tilePos = {x:this.tilePos.x-1,y:this.tilePos.y}
            } else {
                if (remainingVector.x <= 0) {
                    remainingVector.x = remainingVector.x * (-bounce)
                    this.accelerate(-this.speed.x*(1+bounce),0)
                }
            }
        }
        if (sideVector.dir == "right") {
            let bounce = collision[this.tilePos.x+1][this.tilePos.y].bounceFactor
            if (!collision[this.tilePos.x+1][this.tilePos.y].isWall) {
                this.tilePos = {x:this.tilePos.x +1,y:this.tilePos.y}
            } else {
                if (remainingVector.x >= 0) {
                    remainingVector.x = remainingVector.x * (-bounce)
                    this.accelerate(-this.speed.x*(1+bounce),0)
                }
            }
        }
        if (sideVector.dir == "up") {
            let bounce = collision[this.tilePos.x][this.tilePos.y-1].bounceFactor
            if (!collision[this.tilePos.x][this.tilePos.y-1].isWall) {
                this.tilePos = {x:this.tilePos.x,y:this.tilePos.y-1}
            } else {
                if (remainingVector.y <= 0) {
                    remainingVector.y = remainingVector.y * (-bounce)
                    this.accelerate(0,-this.speed.y*(1+bounce))
                }
            }
        }
        if (sideVector.dir == "down") {
            let bounce = collision[this.tilePos.x][this.tilePos.y+1].bounceFactor
            if (!collision[this.tilePos.x][this.tilePos.y+1].isWall) {
                this.tilePos = {x:this.tilePos.x,y:this.tilePos.y+1}
            } else {
                if (remainingVector.y >= 0) {
                    remainingVector.y = remainingVector.y * (-bounce)
                    this.accelerate(0,-this.speed.y*(1+bounce))
                }
            }
        }
        if (!remainingVector.x == 0 || !remainingVector.y == 0) {
            this.move(remainingVector.x,remainingVector.y,collision)
        }
    }
    accelerate(dx,dy) {
        this.speed = {x:this.speed.x+dx,y:this.speed.y+dy}
    }
    updatePos(collision) {
        this.accelerate(-this.speed.x*this.friction,-this.speed.y*this.friction)
        this.move(this.speed.x,this.speed.y,collision)
    }
    vectorToTileEdge(dx,dy) {
        //equation for vector x -> y:
        //dy/dx(x-playerX) + playerY = y
        //equation for vector y -> x
        //dx/dy(y - playerY) + playerX = x]
        let tx = this.tilePos.x
        let ty = this.tilePos.y
        let leftY = (dy/dx) * (tx*100 - this.position.x) + this.position.y
        let rightY = (dy/dx) * (tx*100 + 100 - this.position.x) + this.position.y
        let upX = (dx/dy) * (ty*100 - this.position.y) + this.position.x
        let downX = (dx/dy) * (ty*100 + 100 - this.position.y) + this.position.x
        if (leftY >= ty*100 && leftY <= ty*100 + 100) {
            if(this.position.x + dx < tx*100 && tx*100 <= this.position.x) {
                return {x:tx*100 - this.position.x,y:leftY - this.position.y,dir:"left"}
            }
        }
        if (rightY >= ty*100 && rightY <= ty*100 + 100) {
            if(this.position.x + dx > tx*100 + 100 && tx*100 + 100 >= this.position.x) {
                return {x:tx*100 + 100 - this.position.x,y:rightY - this.position.y,dir:"right"}
            }
        }
        if (upX >= tx*100 && upX <= tx*100 + 100) {
            if(this.position.y + dy < ty*100 && ty*100 <= this.position.y) {
                return {x:upX - this.position.x,y:ty*100 - this.position.y,dir:"up"}
            }
        }
        if (downX >= tx*100 && downX <= tx*100 + 100) {
            if(this.position.y + dy > ty*100 + 100 && ty*100 + 100 >= this.position.y) {
                return {x:downX - this.position.x,y:ty*100 + 100 - this.position.y,dir:"down"}
            }
        }
        return {x:dx,y:dy,dir:null}
    }
    walk(rx,ry) {
        let direction = Math.atan2(ry,rx)
        let dx = this.movementSpeedFactor*Math.cos(direction)
        let dy = this.movementSpeedFactor*Math.sin(direction)
        if (rx ==0 && ry ==0) {
            dx = 0
            dy = 0
        }
        this.accelerate(dx,dy)
    }
}

export class Player extends Creature {
    constructor(spawnX,spawnY) {
        super(spawnX,spawnY)
    }
    takeTurn(inputPacket,viewport) {
        while (this.warp >= 100) {
            this.actions++
            this.warp -= 100
          }
        if (this.currentAction == null) {
            if (inputPacket.keys.indexOf("KeyM") != -1 && (this.movementSpeed>=0.5 || this.actions>0)) {
                this.currentAction = "move"
            }
        }
        if (this.currentAction == "move") {
            if (this.movementSpeed <= 0.5 && this.actions > 0) {
                this.movementSpeed += 7.5
                this.actions--
            }
            this.moveAction(inputPacket,viewport)
        }
        if (Math.floor(this.targetPos.x/100) == this.tilePos.x && Math.floor(this.targetPos.y/100) == this.tilePos.y) {
            this.teleport(this.targetPos.x,this.targetPos.y)
            this.targetPos.x = this.position.x
            this.targetPos.y = this.position.y
          }     
    }
    moveAction(inputPacket,viewport) {
        let potentialTarget = {x:Math.floor(viewport.x + 600 + 2.99 * inputPacket.mouseX -2.99*751),y:Math.floor(viewport.y + 337.5 + 2.98 * inputPacket.mouseY -2.98*255)}
        if (inputPacket.leftMouse && Math.sqrt((potentialTarget.x-this.position.x)*(potentialTarget.x-this.position.x) + (potentialTarget.y-this.position.y)*(potentialTarget.y-this.position.y))/100 <= this.movementSpeed) {
          this.targetPos.x = potentialTarget.x
          this.targetPos.y = potentialTarget.y
          this.movementSpeed -= Math.sqrt((potentialTarget.x-this.position.x)*(potentialTarget.x-this.position.x) + (potentialTarget.y-this.position.y)*(potentialTarget.y-this.position.y))/100
          this.currentAction = null
        } 
    }
}

export class Enemy extends Creature {
    constructor(spawnX, spawnY) {
        super(spawnX,spawnY)
        this.targetSet = false
    }
    takeTurn(player) {
        if (this.currentAction == null) {
            if (player.tilePos.x != this.tilePos.x && player.tilePos.y != this.tilePos.y) {
                this.currentAction = "move"
             }
        }
        if (this.currentAction == "move") {
            let distanceToPlayer = Math.sqrt((player.position.x-this.position.x)*(player.position.x-this.position.x) + (player.position.y-this.position.y)*(player.position.y-this.position.y))/100
            this.moveAction(player,distanceToPlayer)
            //document.getElementById("console").innerText = distanceToPlayer
        }
    }
    moveAction(player,distance) {
        if (this.movementSpeed >= distance) {
            this.targetPos.x = player.position.x
            this.targetPos.y = player.position.y
            this.movementSpeed -= distance
            this.targetSet = true
        } else if (this.actions > 0) {
            if (this.movementSpeed + 7.5 >= distance) {
                this.movementSpeed += 7.5
                this.actions--
                this.targetPos.x = player.position.x
                this.targetPos.y = player.position.y
                this.movementSpeed -= distance
                this.targetSet = true
            } else {
                this.movementSpeed += 7.5
                this.actions--
                let playerAngle = Math.atan2(player.position.y-this.position.y,player.position.x- this.position.x)
                this.targetPos.x = Math.cos(playerAngle) * this.movementSpeed * 100 + this.position.x
                this.targetPos.y = Math.sin(playerAngle) * this.movementSpeed * 100 + this.position.y
                this.movementSpeed = 0
                this.targetSet = true
            }
        }
        if (!(!(Math.sqrt(Math.pow(this.targetPos.x-this.position.x,2)+Math.pow(this.targetPos.y-this.position.y,2)) <= 5) && this.targetSet)) {
            this.currentAction = null
            this.targetSet = false
            this.targetPos.x = this.position.x
            this.targetPos.y = this.position.y
        }
    }
}