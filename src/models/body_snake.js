import { Container, Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";
import { eventEmitter } from "../utils/utils";

export default class BodySnake extends Container {
    constructor(xSprite, ySprite) {
        super();

        this.xSprite = xSprite;
        this.ySprite = ySprite;

        this.body = new Sprite(utils.TextureCache["assets/images/body.png"]);
        this.bodyTurn = new Sprite(utils.TextureCache["assets/images/body_turn.png"]);

        this.body.anchor.set(0.5, 0.5);
        this.bodyTurn.anchor.set(0.5, 0.5);

        this.vx = 0;
        this.vy = 0;

        this.addChild(this.bodyTurn);
        this.addChild(this.body);

        this.body.visible = true;
        this.bodyTurn.visible = false;
        this.setPosition();

    }

    setPosition() {
        this.x = this.xSprite + GameConstant.HEAD_SNAKE_WIDTH / 2;
        this.y = this.ySprite + GameConstant.HEAD_SNAKE_HEIGHT / 2;
    }

    update(rotate) {
        this.setRotate(rotate);
    }

    setVisible(turnDirection) {
        switch (turnDirection) {
            case "rightToBottom":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = 0;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            case "bottomToLeft":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = Math.PI / 2;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            case "leftToTop":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = -Math.PI;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            case "topToRight":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = -Math.PI / 2;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            case "rightToTop":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = Math.PI / 2;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            case "topToLeft":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = 0;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            case "leftToBot":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = -Math.PI / 2;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            case "bottomToRight":
                this.body.visible = false;
                this.bodyTurn.visible = true;
                this.bodyTurn.rotation = Math.PI;
                setTimeout(() => {
                    this.body.visible = true;
                    this.bodyTurn.visible = false;
                }, 0);
                break;
            default:
                break;
        }
    }


    setRotate(rotate) {
        this.body.rotation = rotate;
        this.bodyTurn.rotation = rotate;

    }

    checkCollision() {

    }

}