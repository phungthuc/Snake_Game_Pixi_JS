import { Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";
import { eventEmitter } from "../utils/utils";

export default class TailSnake extends Sprite {
    constructor(xP, yP) {
        super(utils.TextureCache["assets/images/tail.png"]);

        this.xP = xP;
        this.yP = yP;

        this.vx = GameConstant.SPEED_INIT;
        this.vy = 0;

        this.anchor.set(0.5, 0.5);
        this.rotation = 0;

        this.setPosition();
    }

    setPosition() {
        this.x = this.xP + GameConstant.HEAD_SNAKE_WIDTH / 2;
        this.y = this.yP + GameConstant.HEAD_SNAKE_HEIGHT / 2;
    }

    update(rotate) {
        this.setRotate(rotate);
    }

    setRotate(rotate) {
        this.rotation = rotate;
    }

    setVisible(turnDirection) {
        // this.body.visible = true;
        // this.bodyTurn = false;
    }

}