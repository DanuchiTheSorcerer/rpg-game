export class DepthEngine {
    constructor() {
        //returns 2d vertices of transformed 3d objects from a top down view given a camera (x,y,z)
    }
    dimensionDownCube(cameraX,cameraY,cameraZ,cubeX,cubeY,cubeZ,cubeLength) {
        //IMPORTANT!!!! Z is the HEIGHT
        let relativeX = cubeX - cameraX
        let relativeY = cubeY - cameraY
        let relativeZ = cubeZ - cameraZ
        //Define vertices for each face
        let topVertices = [[relativeX,relativeY,relativeZ+cubeLength],[relativeX+cubeLength,relativeY,relativeZ+cubeLength],[relativeX+cubeLength,relativeY+cubeLength,relativeZ+cubeLength],[relativeX,relativeY+cubeLength,relativeZ+cubeLength]]
        let westVertices = [[relativeX,relativeY,relativeZ],[relativeX,relativeY+cubeLength,relativeZ],[relativeX,relativeY+cubeLength,relativeZ+cubeLength],[relativeX,relativeY,relativeZ+cubeLength]]
        let eastVertices = [[relativeX+cubeLength,relativeY,relativeZ],[relativeX+cubeLength,relativeY+cubeLength,relativeZ],[relativeX+cubeLength,relativeY+cubeLength,relativeZ+cubeLength],[relativeX+cubeLength,relativeY,relativeZ+cubeLength]]
        let northVertices = [[relativeX,relativeY,relativeZ],[relativeX+cubeLength,relativeY,relativeZ],[relativeX+cubeLength,relativeY,relativeZ+cubeLength],[relativeX,relativeY,relativeZ+cubeLength]]
        let southVertices = [[relativeX,relativeY+cubeLength,relativeZ],[relativeX+cubeLength,relativeY+cubeLength,relativeZ],[relativeX+cubeLength,relativeY+cubeLength,relativeZ+cubeLength],[relativeX,relativeY+cubeLength,relativeZ+cubeLength]]

        // for the following note that because we are dealing strictly with tiled squares the dot products reduce down substantially
        
        //draw or dont draw the top side

        let twoDimensionShapeSet = []
        if (topVertices[0][2]<0) {
            twoDimensionShapeSet.push(this.dimensionDownCubeFace(topVertices))
            alert("top")
        }
        //draw or dont draw the east side
        if (eastVertices[0][0]<0) {
            twoDimensionShapeSet.push(this.dimensionDownCubeFace(eastVertices))
            //alert("east")
        }
        //draw or dont draw the west side
        if (westVertices[0][0]>0) {
            twoDimensionShapeSet.push(this.dimensionDownCubeFace(westVertices))  
            //alert("west")
        }
        //draw or dont draw the south side
        if (southVertices[0][1]<0) {
            twoDimensionShapeSet.push(this.dimensionDownCubeFace(southVertices))
            //alert("south")
        }
        //draw or dont draw the north side
        if (northVertices[0][1]>0) {
            twoDimensionShapeSet.push(this.dimensionDownCubeFace(northVertices))
            //alert("north")
        }
        for (let i = 0; i<4;i++) {
            alert("Top Vertex " + i + ": " + topVertices[i][0] + ", " + topVertices[i][1] + ", " + topVertices[i][2])
        }
        // for (let i = 0; i<4;i++) {
        //     alert("West Vertex " + i + ": " + westVertices[i][0] + ", " + westVertices[i][1] + ", " + westVertices[i][2])
        // }
        for (let i = 0; i<4;i++) {
            alert("East Vertex " + i + ": " + eastVertices[i][0] + ", " + eastVertices[i][1] + ", " + eastVertices[i][2])
        }
        // for (let i = 0; i<4;i++) {
        //     alert("South Vertex " + i + ": " + southVertices[i][0] + ", " + southVertices[i][1] + ", " + southVertices[i][2])
        // }
        // for (let i = 0; i<4;i++) {
        //     alert("North Vertex " + i + ": " + northVertices[i][0] + ", " + northVertices[i][1] + ", " + northVertices[i][2])
        // }
        return twoDimensionShapeSet
    }
    dimensionDownCubeFace(vertices) {
        return [this.dimensionDownVertex(vertices[0]),this.dimensionDownVertex(vertices[1]),this.dimensionDownVertex(vertices[2]),this.dimensionDownVertex(vertices[3])]
    }
    dimensionDownVertex(vertex) {
        let clippedPoint = this.findIntersectionOfFOV(vertex[0],vertex[1],vertex[2])
        let rx = clippedPoint.x
        let ry = clippedPoint.y
        let rz = clippedPoint.z
        //nearPlaneZ is another way of expressing FOV
        let nearPlaneZ = -600 * Math.sqrt(2)
        return {x:rx*nearPlaneZ/rz,y:ry*nearPlaneZ/rz}
    }
    findIntersectionOfFOV(rx, ry, rz) {
        // Calculate the width and length at the given z (pyramid extends downward, so z is negative)
        function w(z) {
            return Math.sqrt(2) * Math.abs(z);
        }

        function l(z) {
            return (9 * Math.sqrt(2) / 16) * Math.abs(z);
        }

        // Check if the point (rx, ry, rz) is inside or on the pyramid
        if (Math.abs(rx) <= w(rz) / 2 && Math.abs(ry) <= l(rz) / 2 && rz <= 0) {
            return { x: rx, y: ry, z: rz };
        }

        // Calculate the necessary z value to keep x within the pyramid
        let z_from_x = -Math.abs(rx) / Math.sqrt(2);

        // Calculate the necessary z value to keep y within the pyramid
        let z_from_y = -Math.abs(ry) / ((9 * Math.sqrt(2)) / 32);

        // Choose the more negative (smaller) z value to ensure the point is within the pyramid bounds
        let z = Math.min(z_from_x, z_from_y);

        // Recalculate x and y based on the chosen z value
        let x = Math.sign(rx) * w(z) / 2;
        let y = Math.sign(ry) * l(z) / 2;

        return { x: x, y: y, z: z };
    }
}