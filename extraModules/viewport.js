export class Viewport {
    constructor() {
        this.x = 600
        this.y = 337.5
        this.z = 2000
    }
    moveTo(x,y) {
        this.x = x
        this.y = y
    }
    zoomIn() {
        this.z = this.z * 1.25
    }
    zoomOut() {
        this.z = this.z /1.25
    }
}