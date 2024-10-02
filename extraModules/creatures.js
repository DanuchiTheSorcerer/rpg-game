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
        this.movementSpeed = 7.5
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
}

export class Enemy extends Creature {
    constructor(spawnX, spawnY) {
        super(spawnX,spawnY)
    }
}