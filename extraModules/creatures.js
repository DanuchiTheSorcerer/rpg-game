export class Creature {
    constructor() {
        
    }
}

export class Player extends Creature {
    constructor() {
        super()
        this.inventory = []
        this.position = {x:0,y:0}
        this.speed = 4
    }
    move(dx,dy) {
        this.position = {x:this.position.x+dx,y:this.position.y+dy}
    }
    walk(rx,ry) {
        if (rx == 0 && ry == 0) {return}
        let direction = Math.atan2(ry,rx)
        let dx = this.speed*Math.cos(direction)
        let dy = this.speed*Math.sin(direction)
        this.move(dx,dy)
    }
}