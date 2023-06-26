import { Container } from "pixi.js";
import HeadSnake from "../models/head_snake";
import TailSnake from "../models/tail_snake";
import { GameConstant } from "../constants";
import PlayerController from "./player_controller";
import BodySnake from "../models/body_snake";
import { eventEmitter } from "../utils/utils";
import SnakeCollisder from "../collision/snake_collisder";
import RectangleCollider from "../collision/rectangle_collisder";

let scoreDiv = document.getElementById('score-display');
let score = 0;

export default class SnakeManager extends Container {
    constructor(app, bait) {
        super();

        this.app = app;
        this.bait = bait;
        this.snake = [];

        this.snakeAttribute = {
            cells: [],
            maxCells: 4
        };

        this.oldTailX = 0;
        this.countFrame = 0;
        this.direction = null;
        this.create();
        this.isSnakeStraight = true;
        this.turnPosition = [];
        this.isCollision = false;

    }

    create() {
        this.head = new HeadSnake(96, 32);
        this.body = new BodySnake(64, 32);
        this.tail = new TailSnake(32, 32);
        this.tailUpdate = new TailSnake(32, 32);

        this.snake = [
            this.head,
            this.body,
            this.tail
        ];
        this.addChild(this.body);
        this.addChild(this.head);
        this.addChild(this.tail);
        this.addChild(this.tailUpdate);

        this.snakeAttribute.cells = [
            { x: this.head.x, y: this.head.y, rotate: 0 },
            { x: this.body.x, y: this.body.y, rotate: 0 },
            { x: this.tail.x, y: this.tail.y, rotate: 0 }
        ];

        this.playerController = new PlayerController(this.head);
        this.snakeCollisder = new SnakeCollisder(GameConstant.THICKNESS_WALL, GameConstant.THICKNESS_WALL,
            GameConstant.SCREEN_WIDTH - GameConstant.THICKNESS_WALL * 2, GameConstant.SCREEN_HEIGHT - GameConstant.THICKNESS_WALL * 2);
        this.rectCollisder = new RectangleCollider();
    }

    update(delta) {
        this.countFrame += 1;

        this.baitPosition = this.bait.update(delta);

        this.head.update(delta);
        this.head.getCountFrame(this.countFrame);

        this.moveSnake();

        if (this.snakeAttribute.cells.length > this.snakeAttribute.maxCells) {
            this.snakeAttribute.cells.pop();
        }

        this.moveTailSnake();

        if (this.countFrame == 10) {
            this.snakeAttribute.cells.unshift({ x: this.head.x, y: this.head.y, rotate: this.head.rotation });
            this.countFrame = 0;
        }

        this.tailUpdate.rotation = this.snakeAttribute.cells[this.snake.length - 1].rotate;

        this.checkCollision();
        this.head.checkEventEmitter();
        this.playerController.getAttributeHeadSnake(this.head);
    }

    moveSnake(delta) {
        for (let i = 1; i < this.snake.length; i++) {
            this.snake[i].update(this.snakeAttribute.cells[i - 1].rotate);
            this.snake[i].x = this.snakeAttribute.cells[i - 1].x;
            this.snake[i].y = this.snakeAttribute.cells[i - 1].y;
        }

        for (let i = 1; i < this.snake.length - 1; i++) {
            if (this.snake[i].y < this.snake[i - 1].y && this.snake[i].x > this.snake[i + 1].x) {
                this.snake[i].setVisible("rightToBottom");
            }
            if (this.snake[i].x > this.snake[i - 1].x && this.snake[i].y > this.snake[i + 1].y) {
                this.snake[i].setVisible("bottomToLeft");
            }
            if (this.snake[i].y > this.snake[i - 1].y && this.snake[i].x < this.snake[i + 1].x) {
                this.snake[i].setVisible("leftToTop");
            }
            if (this.snake[i].x < this.snake[i - 1].x && this.snake[i].y < this.snake[i + 1].y) {
                this.snake[i].setVisible("topToRight");
            }
            if (this.snake[i].y > this.snake[i - 1].y && this.snake[i].x > this.snake[i + 1].x) {
                this.snake[i].setVisible("rightToTop");
            }
            if (this.snake[i].x > this.snake[i - 1].x && this.snake[i].y < this.snake[i + 1].y) {
                this.snake[i].setVisible("topToLeft");
            }
            if (this.snake[i].y < this.snake[i - 1].y && this.snake[i].x < this.snake[i + 1].x) {
                this.snake[i].setVisible("leftToBot");
            }
            if (this.snake[i].x < this.snake[i - 1].x && this.snake[i].y > this.snake[i + 1].y) {
                this.snake[i].setVisible("bottomToRight");
            }
        }
    }

    checkCollision() {
        if (this.snakeCollisder.wallCollision(this.head.x, this.head.y, GameConstant.HEAD_SNAKE_WIDTH - 16, GameConstant.HEAD_SNAKE_HEIGHT - 16) != undefined) {
            this.isCollision = true;
        }

        for (let i = 2; i < this.snake.length; i++) {
            if (this.head.x == this.snake[i].x && this.head.y == this.snake[i].y) {
                this.isCollision = true;
            }
        }

        if (this.rectCollisder.checkCollision(this.head.x, this.head.y, GameConstant.HEAD_SNAKE_WIDTH, GameConstant.HEAD_SNAKE_HEIGHT,
            this.baitPosition[0], this.baitPosition[1], GameConstant.BAIT_WIDTH, GameConstant.BAIT_HEIGHT) != undefined) {
            this.snakeAttribute.maxCells += 1;
            if ((this.snake[this.snake.length - 2].x - this.snake[this.snake.length - 1].x) >= 0 &&
                (this.snake[this.snake.length - 2].y == this.snake[this.snake.length - 1].y)) {
                this.newBody = new BodySnake(this.snake[this.snake.length - 1].x - GameConstant.HEAD_SNAKE_WIDTH, this.snake[this.snake.length - 1].y);
            } else if ((this.snake[this.snake.length - 2].x - this.snake[this.snake.length - 1].x) < 0 &&
                (this.snake[this.snake.length - 2].y == this.snake[this.snake.length - 1].y)) {
                this.newBody = new BodySnake(this.snake[this.snake.length - 1].x + GameConstant.HEAD_SNAKE_WIDTH, this.snake[this.snake.length - 1].y);
            } else if ((this.snake[this.snake.length - 2].y - this.snake[this.snake.length - 1].y) > 0 &&
                (this.snake[this.snake.length - 2].x == this.snake[this.snake.length - 1].x)) {
                this.newBody = new BodySnake(this.snake[this.snake.length - 1].x, this.snake[this.snake.length - 1].y - GameConstant.HEAD_SNAKE_WIDTH);
            } else if ((this.snake[this.snake.length - 2].y - this.snakeAttribute.cells[this.snake.length - 1].y) < 0 &&
                (this.snake[this.snake.length - 2].x == this.snake[this.snake.length - 1].x)) {
                this.newBody = new BodySnake(this.snake[this.snake.length - 1].x, this.snake[this.snake.length - 1].y + GameConstant.HEAD_SNAKE_WIDTH);
            } else {
                return;
            }


            this.addChild(this.newBody);

            this.snake.splice(this.snake.length - 1, 0, this.newBody);
            this.snakeAttribute.cells.splice(this.snake.length - 1, 0, { x: this.newBody.x, y: this.newBody.y });

            this.updateBait();
        }

        if (this.isCollision === true) {
            this.app.end();
        }
    }

    updateBait() {
        score++;
        scoreDiv.innerHTML = score;

        this.bait.updatePosition();
    }

    moveTailSnake() {
        if (this.snake[this.snake.length - 2].x > this.snake[this.snake.length - 1].x - 32 &&
            this.snakeAttribute.cells[this.snake.length - 1].y == this.snake[this.snake.length - 1].y) {
            if (this.tailUpdate.x - 0 <= this.snake[this.snake.length - 1].x) {
                this.tailUpdate.x += GameConstant.SPEED_INIT;
                this.tailUpdate.y = this.snake[this.snake.length - 1].y;
            }
        }
        if (this.snake[this.snake.length - 2].y > this.snake[this.snake.length - 1].y - 32 &&
            this.snakeAttribute.cells[this.snake.length - 1].x == this.snake[this.snake.length - 1].x) {
            if (this.tailUpdate.y - 0 <= this.snake[this.snake.length - 1].y) {
                this.tailUpdate.y += GameConstant.SPEED_INIT;
                this.tailUpdate.x = this.snake[this.snake.length - 1].x;
            }
        }
        if (this.snake[this.snake.length - 2].x < this.snake[this.snake.length - 1].x + 32 &&
            this.snakeAttribute.cells[this.snake.length - 1].y == this.snake[this.snake.length - 1].y) {
            if (this.tailUpdate.x + 0 >= this.snake[this.snake.length - 1].x) {
                this.tailUpdate.x -= GameConstant.SPEED_INIT;
                this.tailUpdate.y = this.snake[this.snake.length - 1].y;
            }
        }
        if (this.snake[this.snake.length - 2].y < this.snake[this.snake.length - 1].y + 32 &&
            this.snakeAttribute.cells[this.snake.length - 1].x == this.snake[this.snake.length - 1].x) {
            if (this.tailUpdate.y + 0 >= this.snake[this.snake.length - 1].y) {
                this.tailUpdate.y -= GameConstant.SPEED_INIT;
                this.tailUpdate.x = this.snake[this.snake.length - 1].x;
            }
        }
    }
}