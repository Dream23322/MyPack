export class IVec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() { return new IVec2(this.x, this.y); }

    add(x, y) {
        this.x += x;
        this.y += y;
    }

    subtract(x, y) {
        this.x -= x;
        this.y -= y;
    }

    distance(x, y) {
        return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    }
}