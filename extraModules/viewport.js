export class Viewport {
    constructor() {
        this.x = 1200
        this.y = 675
        this.z = 2000
    }
    moveTo(x,y) {
        this.x = x
        this.y = y
    }
    zoomIn() {
        this.z = this.z / 1.25
    }
    zoomOut() {
        this.z = this.z *1.25
    }
}