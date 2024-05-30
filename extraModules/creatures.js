export class Creature {
    constructor() {
        
    }
}

export class Player extends Creature {
    constructor(spawnX,spawnY) {
        super()
        this.inventory = []
        this.position = {x:spawnX,y:spawnY}
        this.speed = {x:0,y:0}
        this.movementSpeedFactor = 4
        this.friction = 5
        //friction * movementSpeedFactor  - friction = terminal velocity
        this.rotation = 0
    }
    teleport(dx,dy) {
        this.position = {x:this.position.x+dx,y:this.position.y+dy}
    }
    move(dx,dy) {
        this.position = {x:this.position.x+dx,y:this.position.y+dy}
    }
    accelerate(dx,dy) {
        this.speed = {x:this.speed.x+dx,y:this.speed.y+dy}
    }
    updatePos(collision) {
        this.accelerate(-this.speed.x/this.friction,-this.speed.y/this.friction)
        this.rotation = Math.atan2(this.speed.y,this.speed.x)
        this.move(this.speed.x,this.speed.y)
        document.getElementById("console").innerText = Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y)
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