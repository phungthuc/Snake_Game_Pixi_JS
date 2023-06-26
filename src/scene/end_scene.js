import { Container, Text, TextStyle } from "pixi.js";
import { GameConstant } from "../constants";

export default class EndScene extends Container {
    constructor() {
        super();

        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 64,
            fill: "white"
        });

        this.winMess = new Text("YOU LOSS", this.style);
        this.winMess.position.set(GameConstant.X_MESS, GameConstant.Y_MESS);
        this.addChild(this.winMess);

    }
}