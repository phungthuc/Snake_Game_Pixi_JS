import { Container } from "pixi.js";
import Bait from "../models/bait";

export default class BaitController extends Container {
    constructor() {
        super();

        this.bait = new Bait();
        this.bait.setPosition();
        this.addChild(this.bait);
    }

    create() {

    }

    update(delta) {
        return [
            this.bait.x,
            this.bait.y
        ]
    }

    updatePosition() {
        this.bait.updatePosition();
    }
}