import { Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";

export default class BackGround extends Sprite {
    constructor() {
        super(utils.TextureCache["dungeon.png"]);

        this.width = GameConstant.SCREEN_WIDTH;
        this.height = GameConstant.SCREEN_HEIGHT;

        this.setPosition();
    }

    update() {

    }

    setPosition() {
        this.position.set(0, 0);
    }

    checkCollision() {
    }
}