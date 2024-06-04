export class StaticTile {
    constructor(xLocation,yLocation,isWall,bounceFactor,func) {
        this.position = {x:xLocation,y:yLocation}
        this.isWall = isWall
        this.bounceFactor = bounceFactor
        this.func = func
    }
}