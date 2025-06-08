export class IVec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    subtract(x, y, z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
    }
    down = (x = 1) => this.y -= x;
    up = (x = 1) => this.y += x;
    forward = (x = 1) => this.x += x;
    back = (x = 1) => this.x -= x;
    left = (x = 1) => this.z -= x;
    right = (x = 1) => this.z += x;


    clone() { return new IVec3(this.x, this.y, this.z); }

    distance(x, y, z) {
        return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2 + (z - this.z) ** 2);
    }
}

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