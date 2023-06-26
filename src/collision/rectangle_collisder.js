export default class RectangleCollider {
    constructor() {
    }

    checkCollision(objX1, objY1, objWidth1, objHeight1, objX2, objY2, objWidth2, objHeight2) {
        const deltaWidth = (objWidth1 + objWidth2) / 2;
        const deltaHeight = (objHeight1 + objHeight2) / 2;
        const center1X = objX1 + objWidth1 / 2;
        const center1Y = objY1 + objHeight1 / 2;
        const center2X = objX2 + objWidth2 / 2;
        const center2Y = objY2 + objHeight2 / 2;

        const deltaX = Math.abs(center1X - center2X);
        const deltaY = Math.abs(center1Y - center2Y);

        if (deltaX < deltaWidth && deltaY < deltaHeight) {
            const overlapX = deltaWidth - deltaX;
            const overlapY = deltaHeight - deltaY;

            if (overlapX > overlapY) {
                if (center1Y > center2Y) {
                    return "top";
                }
                return "bottom";
            }
            if (center1X > center2X) {
                return "left";
            }
            return "right";
        }
        return null;
    }

}
