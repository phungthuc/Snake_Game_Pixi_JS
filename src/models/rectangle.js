import { Graphics } from "pixi.js";
import { eventEmitter, randomInt } from "../utils/utils";
import { GameConstant } from "../constants";

var countFrame = 0;
var isTurn = null;

export class Rectangle extends Graphics {
    constructor(xP, yP) {
        super();

        this.xP = xP;
        this.yP = yP;

        this.vx = GameConstant.SPEED_INIT;
        this.vy = 0;

        this.beginFill(1, 1, 1, 255);
        this.drawRect(0, 0, 32, 32);
        this.endFill();

        this.setPosition();
    }

    setPosition() {
        this.x = this.xP;
        this.y = this.yP;
    }

    update(delta) {
        this.x += this.vx;
        this.y += this.vy;
        this.checkTurnStatus();
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