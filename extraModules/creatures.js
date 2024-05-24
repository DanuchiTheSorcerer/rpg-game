export class Creature {
    constructor() {
        
    }
}

export class Player extends Creature {
    constructor() {
        super()
        this.inventory = []
        this.position = {x:0,y:0}
    }
    move(dx,dy) {
        this.position = {x:this.position.x+dx,y:this.position.y+dy}
    }
}