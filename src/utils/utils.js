import { Sprite, utils } from "pixi.js";
const EventEmitter = require("events");

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const eventEmitter = new EventEmitter();

export function randomLocationBait() {
    const min = 1;
    const max = 14;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num * 32;
}

export function checkOverlap(square1, square2) {
    const area1 = square1.width * square1.height;
    const area2 = square2.width * square2.height;

    const left1 = square1.x;
    const right1 = square1.x + square1.width;
    const top1 = square1.y;
    const bottom1 = square1.y + square1.height;

    const left2 = square2.x;
    const right2 = square2.x + square2.width;
    const top2 = square2.y;
    const bottom2 = square2.y + square2.height;

    const overlapLeft = Math.max(left1, left2);
    const overlapRight = Math.min(right1, right2);
    const overlapTop = Math.max(top1, top2);
    const overlapBottom = Math.min(bottom1, bottom2);

    const overlapWidth = overlapRight - overlapLeft;
    const overlapHeight = overlapBottom - overlapTop;
    const overlapArea = overlapWidth * overlapHeight;

    if (overlapArea > area1 / 2) {
        return true;
    } else {
        return false;
    }
}