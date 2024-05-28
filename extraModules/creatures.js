export class Creature {
    constructor() {
        
    }
}

export class Player extends Creature {
    constructor() {
        super()
        this.inventory = []
        this.position = {x:0,y:0}
        this.speed = {x:0,y:0}
        this.movementSpeedFactor = 1
    }
    move(dx,dy) {
        this.position = {x:this.position.x+dx,y:this.position.y+dy}
    }
    accelerate(dx,dy) {
        this.speed = {x:this.speed.x+dx,y:this.speed.y+dy}
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
        this.accelerate(-this.speed.x/50,-this.speed.y/50)
        this.move(this.speed.x,this.speed.y)
        document.getElementById("console").innerText = Math.sqrt(this.speed.x*this.speed.x + this.speed.y*this.speed.y)
    }
}