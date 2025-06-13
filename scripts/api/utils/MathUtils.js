/**
 * @class MathUtils
 * @description A utility class for mathematical operations.
 * This class provides various static methods for mathematical calculations.
 * @example
 * const maths = new MathUtils();
 * maths.clamp(15, 1, 10); // Returns 10
 */
export class MathUtils {
    constructor() {}

    /**
     * @name clamp
     * @description Clamps a number between a minimum and maximum value.
     * @param {number} value - The number to clamp.
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @returns {number} - Returns the clamped value.
     * @example
     * const clampedValue = MathUtils.clamp(11, 1, 10); // Returns 10
     * const clampedValue2 = MathUtils.clamp(-5, 0, 100); // Returns 0
     * @throws {Error} - Throws an error if min is greater than max.
     * @throws {TypeError} - Throws a TypeError if value, min, or max are not numbers.
     * @throws {Error} - Throws an error if any of value, min, or max is NaN/null.
     */
    static clamp(value, min, max) {
        if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
            throw new TypeError("All parameters must be numbers.");
        }
        if (isNaN(value) || isNaN(min) || isNaN(max)) {
            throw new Error("Parameters cannot be NaN.");
        }
        if (min > max) {
            throw new Error("Minimum value cannot be greater than maximum value.");
        }
        return Math.max(min, Math.min(max, value));
    }
    /**
     * @name distance3d
     * @description Calculates the Euclidean distance between two points in 3D space.
     * Can be called as distance3d(x1, y1, z1, x2, y2, z2) or distance3d({x, y, z}, {x, y, z}).
     * @param {number|object} x1 - The x-coordinate of the first point or the first point object.
     * @param {number|object} y1 - The y-coordinate of the first point or the second point object.
     * @param {number} [z1] - The z-coordinate of the first point.
     * @param {number} [x2] - The x-coordinate of the second point.
     * @param {number} [y2] - The y-coordinate of the second point.
     * @param {number} [z2] - The z-coordinate of the second point.
     * @returns {number} - Returns the distance between the two points.
     * @example
     * const distance = MathUtils.distance3d(1, 2, 3, 4, 5, 6); // Returns approximately 5.196
     * const distance2 = MathUtils.distance3d({x: 5, y: 1, z: 2}, {x: 2, y: -2, z: 3}); // Returns approximately 4.3589
     * @throws {TypeError} - Throws a TypeError if any of the coordinates are not numbers.
     * @throws {Error} - Throws an error if any of the coordinates are NaN/null.
     */
    static distance3d(x1, y1, z1, x2, y2, z2) {
        let a, b;
        if (
            typeof x1 === 'object' && x1 !== null &&
            typeof y1 === 'object' && y1 !== null &&
            arguments.length === 2
        ) {
            a = x1;
            b = y1;
            x1 = a.x; y1 = a.y; z1 = a.z;
            x2 = b.x; y2 = b.y; z2 = b.z;
        }
        if (
            typeof x1 !== 'number' || typeof y1 !== 'number' || typeof z1 !== 'number' ||
            typeof x2 !== 'number' || typeof y2 !== 'number' || typeof z2 !== 'number'
        ) {
            throw new TypeError("All coordinates must be numbers.");
        }
        if (
            isNaN(x1) || isNaN(y1) || isNaN(z1) ||
            isNaN(x2) || isNaN(y2) || isNaN(z2)
        ) {
            throw new Error("Coordinates cannot be NaN.");
        }
        return Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2) +
            Math.pow(z2 - z1, 2)
        );
    }
}

/**
 * @class FastMath
 * @description A utility class for fast mathematical operations.
 * This class provides various static methods for fast mathematical calculations.
 * @example
 * const fastMath = new FastMath();
 * fastMath.distance3d(5, 1, 2, 2, -2, 3); // Returns approximately 4.3589
 **/
class FastMath {
    constructor() {}

    /**
     * @name distance2d
     * @description Calculates the Euclidean distance between two points in 2D space.
     * @param {number} x1 - The x-coordinate of the first position.
     * @param {number} y1 - The y-coordinate of the first position.
     * @param {number} x2 - The x-coordinate of the second position.
     * @param {number} y2 - The y-coordinate of the second position.
     * @returns {number} - Returns the distance between the two points.
     * @example
     * const distance = FastMath.distance2d(1, 2, 4, 5); // Returns 2.236
     * const distance2 = FastMath.distance2d(5, 1, 2, -2); // Returns 3.162
     * @throws {Error} - Throws an error if any of the coordinates are NaN/null.
     */
    static distance2d(x1, y1, x2, y2) {
        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
            throw new Error("Coordinates cannot be NaN.");
        }
        return Math.sqrt(
            (x2 - x1) ** 2 +
            (y2 - y1) ** 2
        );
    }
    /**
     * @name distance3d
     * @description Calculates the Euclidean distance between two points in 3D space.
     * @param {number} x1 - The x-coordinate of the first position.
     * @param {number} y1 - The y-coordinate of the first position.
     * @param {number} z1 - The z-coordinate of the first position.
     * @param {number} x2 - The x-coordinate of the second position.
     * @param {number} y2 - The y-coordinate of the second position.
     * @param {number} z2 - The z-coordinate of the second position.
     * @returns {number} - Returns the distance between the two points.
     * @example
     * const distance = FastMath.distance3d(1, 2, 3, 4, 5, 6); // Returns approximately 5.196
     * const distance2 = FastMath.distance3d(5, 1, 2, 2, -2, 3); // Returns approximately 4.3589
     * @throws {Error} - Throws an error if any of the coordinates are NaN/null.
     */
    static distance3d(x1, y1, z1, x2, y2, z2) {
        if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) {
            throw new Error("Coordinates cannot be NaN.");
        }
        return Math.sqrt(
            (x2 - x1) ** 2 +
            (y2 - y1) ** 2 +
            (z2 - z1) ** 2
        ); 
    }  
}