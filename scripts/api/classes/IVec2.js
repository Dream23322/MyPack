/**
 * @class IVec2
 * @constructor x {number} - The first point of the vector.
 * @constructor y {number} - The second point of the vector.
 * @property {number} x - The x-coordinate of the vector.
 * @property {number} y - The y-coordinate of the vector.
 * @description Represents a 2D vector with basic operations like addition, subtraction, and distance calculation.
 * @example
 * const vec = new IVec2(3, 4);
 * vec.add(1, 2); // vec.x = 4, vec.y = 6
 * vec.subtract(1, 1); // vec.x = 3, vec.y = 5
 * vec.distance(0, 0); // Returns the distance from (3, 5) to (0, 0)
 */
export class IVec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @name clone
     * @example
     * const vec = new IVec2(3, 4);
     * const clonedVec = vec.clone(); // clonedVec.x = 3, clonedVec.y = 4
     * @returns {IVec2} - Returns a new instance of IVec2 with the same x and y values.
     */
    clone() { return new IVec2(this.x, this.y); }

    /**
     * @name add
     * @param {number} x - The value to add to the x-coordinate.
     * @param {number} y - The value to add to the y-coordinate.
     * @description Adds the specified x and y values to the current vector's coordinates.
     * @example
     * const vec = new IVec2(3, 4);
     * vec.add(1, 2); // vec.x = 4, vec.y = 6
     * @returns {void}
     */
    add(x, y) {
        this.x += x;
        this.y += y;
    }

    /**
     * @name subtract
     * @param {number} x - The value to subtract from the x-coordinate.
     * @param {number} y - The value to subtract from the y-coordinate.
     * @description Subtracts the specified x and y values from the current vector's coordinates.
     * @example
     * const vec = new IVec2(3, 4);
     * vec.subtract(1, 1); // vec.x = 2, vec.y = 3
     * @returns {void}
     */
    subtract(x, y) {
        this.x -= x;
        this.y -= y;
    }

    /**
     * @name distance
     * @param {number} x - The x-coordinate of the point to calculate the distance to.
     * @param {number} y - The y-coordinate of the point to calculate the distance to.
     * @description Calculates the Euclidean distance from the current vector to the specified point (x, y).
     * @example
     * const vec = new IVec2(3, 4);
     * const dist = vec.distance(0, 0); // Returns 5
     * @returns {number} - The distance from the current vector to the specified point.
     */
    distance(x, y) {
        return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    }
}