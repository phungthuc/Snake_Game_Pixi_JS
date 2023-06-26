import { Graphics, Sprite } from "pixi.js";
import { eventEmitter } from "../utils/utils";

var headSnake = null;

export default class PlayerController extends Graphics {
    constructor(sprite) {
        super();
        this.sprite = sprite;

        window.addEventListener("keyup", this.onKeyUp)
    }

    getAttributeHeadSnake(headSnakeAttribute) {
        headSnake = headSnakeAttribute;
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case 37:
                if (headSnake.vy == 0) {
                    return;
                }
                eventEmitter.emit("left");
                break;
            case 38:
                if (headSnake.vx == 0) {
                    return;
                }
                eventEmitter.emit("top");
                break;
            case 39:
                if (headSnake.vy == 0) {
                    return;
                }
                eventEmitter.emit("right");
                break;
            case 40:
                if (headSnake.vx == 0) {
                    return;
                }
                eventEmitter.emit("bottom");
                break;
            default:
                break;
        }
    }
}