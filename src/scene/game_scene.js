import { Application, Container, Loader, Sprite, utils } from "pixi.js";
import { GameConstant } from "../constants";
import BackGround from "../models/background";
import SnakeManager from "../manager/snake_manager";
import BaitController from "../manager/bait_controller";
import EndScene from "./end_scene";

export default class GameScene extends Application {
    constructor() {
        super();
        super({
            width: GameConstant.SCREEN_WIDTH,
            height: GameConstant.SCREEN_HEIGHT
        });
        this.renderer.backgroundColor = 0x061639;

        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.top = "50%";
        this.renderer.view.style.left = "50%";
        this.renderer.view.style.transform = "translate(-50%,-50%)";
        this.renderer.view.style.border = "1px solid #d8d8d8";
        document.body.appendChild(this.view);

        this.gameScene = new Container();
        this.stage.addChild(this.gameScene);
    }

    load() {
        Loader.shared
            .add("assets/images/treasureHunter.json")
            .add("assets/images/apple.png")
            .add("assets/images/body.png")
            .add("assets/images/body_turn.png")
            .add("assets/images/head.png")
            .add("assets/images/tail.png")
            .load(() => {
                this.setup();
            });
    }

    setup() {
        this.bg = new BackGround();
        this.gameScene.addChild(this.bg);

        this.baitController = new BaitController();
        this.gameScene.addChild(this.baitController);

        this.snake = new SnakeManager(this, this.baitController);
        this.gameScene.addChild(this.snake);

        this.ticker.add((delta) => {
            this.gameLoop(delta);
        });
    }

    gameLoop(delta) {
        this.snake.update(delta);
    }

    end() {
        this.gameScene.visible = false;
        this.endScene = new EndScene();
        this.stage.addChild(this.endScene);
    }
}