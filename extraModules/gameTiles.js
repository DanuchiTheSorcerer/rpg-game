export class StaticTile {
    constructor(xLocation,yLocation,isWall,func) {
        this.position = {x:xLocation,y:yLocation}
        this.isWall = isWall
        this.func = func
    }
}