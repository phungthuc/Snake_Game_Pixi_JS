import { Sprite, utils } from "pixi.js";
import { randomLocationBait } from "../utils/utils";

export default class Bait extends Sprite {
    constructor() {
        super(utils.TextureCache["assets/images/apple.png"]);

    }

    update(delta) {

    }

    setPosition() {
        this.x = randomLocationBait();
        this.y = randomLocationBait();
    }

    updatePosition() {
        this.x = randomLocationBait();
        this.y = randomLocationBait();
    }
}