export default class SnakeCollisder {
    constructor(xWall, yWall, widthWall, heightWall) {
        this.xWall = xWall;
        this.yWall = yWall;
        this.widthWall = widthWall;
        this.heightWall = heightWall;
    }

    wallCollision(x, y, width, height) {
        if (y < this.yWall) {
            return "top";
        } else if (x + width > this.xWall + this.widthWall) {
            return "right";
        } else if (y + width > this.yWall + this.heightWall) {
            return "bottom";
        } else if (x < this.xWall) {
            return "left";
        }
    }
}