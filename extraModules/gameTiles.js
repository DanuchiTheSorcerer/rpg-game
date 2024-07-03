export class StaticTile {
    constructor(xLocation,yLocation,isWall,bounceFactor,func,sideColor,topColor) {
        this.position = {x:xLocation,y:yLocation}
        this.isWall = isWall
        this.bounceFactor = bounceFactor
        this.func = func
        this.sideColor = sideColor
        this.topColor = topColor
    }
}

export class EmptyTile {
    constructor(xLocation,yLocation) {
        this.xLocation = xLocation
        this.yLocation = yLocation
        this.isEmpty = true
    }
}