import { Graphics, Sprite, utils } from "pixi.js";
import { eventEmitter, randomInt } from "../utils/utils";
import { GameConstant } from "../constants";

var countFrame = 0;
var isTurn = null;

export default class HeadSnake extends Sprite {
    constructor(xP, yP) {
        super(utils.TextureCache["assets/images/head.png"]);

        this.xP = xP;
        this.yP = yP;

        this.vx = GameConstant.SPEED_INIT;
        this.vy = 0;

        this.rotation = 0;
        this.anchor.set(0.5, 0.5);

        this.setPosition();
    }

    setPosition() {
        this.x = this.xP + GameConstant.HEAD_SNAKE_WIDTH / 2;
        this.y = this.yP + GameConstant.HEAD_SNAKE_HEIGHT / 2;
    }

    update(delta) {
        this.x += this.vx;
        this.y += this.vy;
        this.checkTurnStatus();
        this.setRotate();
    }

    getCountFrame(countFrameManager) {
        countFrame = countFrameManager;
    }

    checkTurnStatus() {
        if (countFrame == 9 && isTurn == "bottom") {
            this.vx = 0;
            this.vy = GameConstant.SPEED_INIT;
            isTurn = null;
        } else if (countFrame == 9 && isTurn == "left") {
            this.vx = -GameConstant.SPEED_INIT;
            this.vy = 0;
            isTurn = null;
        } else if (countFrame == 9 && isTurn == "top") {
            this.vx = 0;
            this.vy = -GameConstant.SPEED_INIT;
            isTurn = null;
        }
        else if (countFrame == 9 && isTurn == "right") {
            this.vx = GameConstant.SPEED_INIT;
            this.vy = 0;
            isTurn = null;
        }
    }

    setRotate() {
        if (this.vy > 0) {
            this.rotation = Math.PI / 2;
        } else if (this.vy < 0) {
            this.rotation = -Math.PI / 2;
        } else if (this.vx > 0) {
            this.rotation = 0;
        } else if (this.vx < 0) {
            this.rotation = -Math.PI;
        }
    }

    checkCollision() {

    }

    checkEventEmitter() {
        eventEmitter.on("bottom", () => {
            isTurn = "bottom";
        });
        eventEmitter.on("left", () => {
            isTurn = "left";
        });
        eventEmitter.on("top", () => {
            isTurn = "top";
        });
        eventEmitter.on("right", () => {
            isTurn = "right";
        });
    }

}