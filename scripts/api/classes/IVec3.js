/**
 * @class IVec3
 * @description Represents a 3D vector with integer coordinates.
 * * This class provides methods for basic vector operations such as addition, subtraction, and distance calculation.
 * @constructor x {number} - The x-coordinate of the vector.
 * @constructor y {number} - The y-coordinate of the vector.
 * @constructor z {number} - The z-coordinate of the vector.
 * @property {number} x - The x-coordinate of the vector.
 * @property {number} y - The y-coordinate of the vector.
 * @property {number} z - The z-coordinate of the vector.
 * @example
 * const vec = new IVec3(1, 2, 3);
 * vec.add(1, 1, 1); // vec.x = 2, vec.y = 3, vec.z = 4
 * vec.subtract(1, 1, 1); // vec.x = 1, vec.y = 2, vec.z = 3
 * // Move the vector down by 1
 * vec.down(); // vec.y = 1
 */
export class IVec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * @name add
     * @param {number} x - The value to add to the x-coordinate.
     * @param {number} y - The value to add to the y-coordinate.
     * @param {number} z - The value to add to the z-coordinate.
     * @description Adds the specified x, y, and z values to the current vector's coordinates.
     * @example
     * const vec = new IVec3(1, 2, 3);
     * vec.add(1, 1, 1); // vec.x = 2, vec.y = 3, vec.z = 4
     * @returns {void}
     */
    add(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    /**
     * @name subtract
     * @param {number} x - The value to subtract from the x-coordinate.
     * @param {number} y - The value to subtract from the y-coordinate.
     * @param {number} z - The value to subtract from the z-coordinate.
     * @description Subtracts the specified x, y, and z values from the current vector's coordinates.
     * @example
     * const vec = new IVec3(1, 2, 3);
     * vec.subtract(1, 1, 1); // vec.x = 0, vec.y = 1, vec.z = 2
     * @returns {void}
     */
    subtract(x, y, z) {
        this.x -= x;
        this.y -= y;
        this.z -= z;
    }

    /** 
     * @name down @description Moves the vector down by the specified amount. 
     * @param {number} x - The amount to move down. 
     * @returns {void} 
    **/ 
    down = (x = 1) => this.y -= x;
    
    /**
     * @name up
     * @description Moves the vector up by the specified amount.
     * @param {number} x - The amount to move up.
     * @returns {void}
    **/
    up = (x = 1) => this.y += x;

    /**
     * @name forward
     * @description Moves the vector forward (positive x direction) by the specified amount.
     * @param {number} x - The amount to move forward.
     * @returns {void}
    **/
    forward = (x = 1) => this.x += x;
    /**
     * @name back
     * @description Moves the vector backward (negative x direction) by the specified amount.
     * @param {number} x - The amount to move backward.
     * @returns {void}
    **/
    back = (x = 1) => this.x -= x;

    /**
    * @name left
    * @description Moves the vector to the left (negative z direction) by the specified amount.
    * @param {number} x - The amount to move left.
    * @returns {void}
    **/
    left = (x = 1) => this.z -= x;

    /**
     * @name right
     * @description Moves the vector to the right (positive z direction) by the specified amount.
     * @param {number} x - The amount to move right.
     * @returns {void}
    **/
    right = (x = 1) => this.z += x;


    /**
     * @name clone
     * @description Creates a new instance of IVec3 with the same x, y, and z values.
     * @return {IVec3} - A new IVec3 instance with the same coordinates.
     * @example
     * const vec = new IVec3(1, 2, 3);
     * const clonedVec = vec.clone(); // clonedVec.x = 1, clonedVec.y = 2, clonedVec.z = 3
     */
    clone() { return new IVec3(this.x, this.y, this.z); }

    /**
     * @name distance
     * @param {number} x - The x-coordinate of the point to calculate the distance to.
     * @param {number} y - The y-coordinate of the point to calculate the distance to.
     * @param {number} z - The z-coordinate of the point to calculate the distance to.
     * @description Calculates the Euclidean distance from the current vector to the specified point (x, y, z).
     * @example
     * const vec = new IVec3(1, 2, 3);
     * const dist = vec.distance(0, 0, 0); // Returns the 3D distance from (1, 2, 3) to (0, 0, 0)
     * @returns {number} - The distance from the current vector to the specified point.
     */
    distance(x, y, z) {
        return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2 + (z - this.z) ** 2);
    }
}

