export class Viewport {
    constructor() {
        this.x = -600
        this.y = -337.5
        this.scale = 1
    }
    moveTo(x,y) {
        this.x = x
        this.y = y
    }
    zoomIn() {
        this.scale = this.scale * 1.1
    }
    zoomOut() {
        this.scale = this.scale / 1.1
    }
}