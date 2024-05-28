export class InputController {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.leftMouse = false;
        this.keys = []
        document.addEventListener("mousemove", this.getMousePos.bind(this));
        document.addEventListener("mousedown", this.mouseDown.bind(this));
        document.addEventListener("mouseup", this.mouseUp.bind(this));
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }  
    mouseDown() {
        this.leftMouse = true
    }
    mouseUp() {
        this.leftMouse = false
    }
    getMousePos(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    keyDown(e) {
        if (!e.repeat) {
            this.keys.push(e.code)
        }
    }
    keyUp(e) {
        this.keys = this.keys.filter(item => item !== e.code)
    }
    getInputPacket() {
        let returnValue = {}
        //initiate vars for landscape
        let innerHeight = window.innerHeight
        let innerWidth = window.innerHeight * 16/9
        let sideLength = (window.innerWidth - innerWidth)/2
        //if portrait make them portrait
        if (window.innerHeight/window.innerWidth>9/16) {
            innerWidth = window.innerWidth
            innerHeight = window.innerWidth * 9/16
            sideLength = (window.innerHeight - innerHeight)/2
        }
        //actually returning things
        if (window.innerHeight/window.innerWidth>9/16) {
            returnValue = {
                mouseX: this.mouseX*(1200/innerWidth),
                mouseY: (this.mouseY - sideLength)*(675/innerHeight),
                leftMouse:this.leftMouse,
                keys: this.keys
            }
        } else {
            returnValue = {
                mouseX: (this.mouseX - sideLength)*(1200/innerWidth),
                mouseY: this.mouseY*(675/innerHeight),
                leftMouse:this.leftMouse,
                keys: this.keys
            }
        }
        //let console = Math.floor(returnValue.mouseX) + " " + Math.floor(returnValue.mouseY) + " " + returnValue.leftMouse
        //console = ""
        //for (let i = 0;i<this.keys.length;i++) {console = console + this.keys[i] + " "}
        //document.getElementById("console").innerText = console
        return returnValue
    }
}