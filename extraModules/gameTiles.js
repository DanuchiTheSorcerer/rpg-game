export class StaticTile {
    constructor(xLocation,yLocation,isWall,bounceFactor,func,sideColor,topColor,height) {
        this.position = {x:xLocation,y:yLocation}
        this.isWall = isWall
        this.bounceFactor = bounceFactor
        this.func = func
        this.sideColor = sideColor
        this.topColor = topColor
        this.isEmpty = false
        this.height = height
    }
}

export class EmptyTile {
    constructor(xLocation,yLocation) {
        this.position = {x:xLocation,y:yLocation}
        this.isEmpty = true
    }
}

export class FloorTile {
    constructor(xLocation,yLocation,sideColor,topColor) {
        this.position = {x:xLocation,y:yLocation}
        this.sideColor = sideColor
        this.topColor = topColor
        this.isEmpty = false
    }
}