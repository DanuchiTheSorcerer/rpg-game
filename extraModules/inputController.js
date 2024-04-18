export class InputController {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        document.addEventListener("mousemove", this.getMousePos.bind(this));
    }  

    getMousePos(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    getInputPacket() {
        let returnValue = {}
        let innerHeight = window.innerHeight
        let innerWidth = window.innerHeight * 16/9
        let sideLength = (window.innerWidth - innerWidth)/2
        if (window.innerHeight/window.innerWidth>9/16) {
            innerWidth = window.innerWidth
            innerHeight = window.innerWidth * 9/16
            sideLength = (window.innerHeight - innerHeight)/2
        }
        if (window.innerHeight/window.innerWidth>9/16) {
            returnValue = {
                mouseX: this.mouseX*(1200/innerWidth),
                mouseY: (this.mouseY - sideLength)*(675/innerHeight)
            }
        } else {
            returnValue = {
                mouseX: (this.mouseX - sideLength)*(1200/innerWidth),
                mouseY: this.mouseY*(675/innerHeight)
            }
        }
        return returnValue
    }
}