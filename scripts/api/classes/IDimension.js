import * as mc from "@minecraft/server"
import { IVec3 } from "./IVec3"
import { IBlock } from "./IBlock";

/**
 * @class IDimension
 * @description Represents a Minecraft dimension. Allows you to interact with the dimension.
 * @contructor {string} key - The key of the dimension, e.g., "overworld", "nether", "the_end".
 * @property {mc.Dimension} dimension - The dimension object associated with the key.
 * @property {string} id - The key of the dimension, e.g., "overworld", "nether", "the_end".
 * @example
 * const overworld = new IDimension("overworld");
 * overworld.setBlock(new IVec3(0, 64, 0), new IBlock("stone"));
 * @throws {TypeError} - Throws an error if the key is not a string or if the dimension does not exist.
 */
export class IDimension {
    constructor(key) {
        if (typeof key !== "string") {
            throw new TypeError("Dimension key must be a string: 'overworld', 'nether', 'the_end'.");
        }

        if (!mc.world.getDimension(key)) {
            throw new Error(`Dimension type '${key}' does not exist.`);
        }

        this.dimension = mc.world.getDimension(key)
        this.id = key
    }

    /**
     * @name getDimension
     * @description Retrieves the dimension object associated with the specified key.
     * @example
     * const dimension = new IDimension("overworld");
     * const currentDimension = dimension.getDimension();
     * 
     * console.log(`Current dimension: ${currentDimension.id}`); // Outputs the id of the dimension
     * @returns {mc.Dimension} - Returns the dimension object associated with the specified key.
     */
    getDimension() {
        return this.dimension;
    }

    /**
     * @name setDimension
     * @description Sets the dimension to the specified key.
     * @example
     * const dimension = new IDimension("overworld");
     * dimension.setDimension("nether");
     * console.log(`Dimension set to: ${dimension.getDimension().id}`); // Outputs "nether"
     * @param {string} key - The key of the dimension to set, e.g., "overworld", "nether", "the_end".
     * @returns {void}
     */
    setDimension(key) {
        if(key === null) throw new Error("Dimension key cannot be null");
        if(typeof key !== "string") throw new Error("Dimension key must be a string: 'overworld', 'nether', 'the_end'.");
        if(!mc.world.getDimension(key)) throw new Error(`Dimension type '${key}' does not exist.`);
        this.dimension = mc.world.getDimension(key);
        this.id = key;
    }

    /**
     * @name getBlock
     * @description Retrieves a block at the specified coordinates in the dimension.
     * @param {IVec3|{x: number, y: number, z: number}|number} vec3 - The coordinates of the block to retrieve, either as an IVec3 object or an object with x, y, and z properties, can also just be x if y and z are not null.
     * @param {number} y - The y-coordinate of the block, if vec3 is not an IVec3 object.
     * @param {number} z - The z-coordinate of the block, if vec3 is not an IVec3 object.
     * @example
     * const overworld = new IDimension("overworld");
     * const block = overworld.getBlock(new IVec3(0, 64, 0));
     * 
     * console.warn(`block at (0, 64, 0) is ${block.type}`); // Outputs the type of the block at the specified coordinates
     * @returns {mc.Block} - Returns the block object at the specified coordinates.
     */
    getBlock(vec3, y = null, z = null) {
        if (y !== null && z !== null) {
            vec3 = new IVec3(vec3, y, z);
        }
        if(vec3 instanceof IVec3 === false) {
            vec3 = new IVec3(vec3.x, vec3.y, vec3.z);
        }
        const block = new IBlock(vec3.x, vec3.y, vec3.z);
        block.dimension = this.id;
        block.updateBlock();
        block = block.getBlock();
        return block
    }

    /**
     * @name getBlockType
     * @description Retrieves the type of a block at the specified coordinates in the dimension.
     * @param {IVec3|{x: number, y: number, z: number}|number} vec3 - The coordinates of the block to retrieve, either as an IVec3 object or an object with x, y, and z properties, can also just be x if y and z are not null.
     * @param {number} y - The y-coordinate of the block, if vec3 is not an IVec3 object.
     * @param {number} z - The z-coordinate of the block, if vec3 is not an IVec3 object.
     * @example
     * const overworld = new IDimension("overworld");
     * const blockType = overworld.getBlockType(new IVec3(0, 64, 0));
     * 
     * console.warn(`block at (0, 64, 0) is ${blockType}`); // Outputs the type of the block at the specified coordinates
     */
    getBlockType(vec3, y = null, z = null) {
        if (y !== null && z !== null) {
            vec3 = new IVec3(vec3, y, z);
        }
        if(vec3 instanceof IVec3 === false) {
            vec3 = new IVec3(vec3.x, vec3.y, vec3.z);
        }
        const block = this.getBlock(vec3);
        return block.typeId;
    }

    /**
     * @name isBlockAir
     * @description Checks if the block at the specified coordinates in the dimension is air.
     * @param {IVec3|{x: number, y: number, z: number}|number} vec3 - The coordinates of the block to check, either as an IVec3 object or an object with x, y, and z properties, can also just be x if y and z are not null.
     * @param {number} y - The y-coordinate of the block, if vec3 is not an IVec3 object.
     * @param {number} z - The z-coordinate of the block, if vec3 is not an IVec3 object.
     * @example
     * const overworld = new IDimension("overworld");
     * 
     * overworld.setBlock("minecraft:air", new IVec3(0, 64, 0));
     * overworld.setBLock("minecraft:stone", new IVec3(1, 64, 0));
     * 
     * console.warn(`block at (0, 64, 0) is air: ${overworld.isBlockAir(new IVec3(0, 64, 0))}`); // Outputs true
     * console.warn(`block at (1, 64, 0) is air: ${overworld.isBlockAir(new IVec3(1, 64, 0))}`); // Outputs false
     * @returns {boolean} - Returns true if the block at the specified coordinates is air, false otherwise.
     */
    isBlockAir(vec3, y = null, z = null) {
        if (y !== null && z !== null) { 
            vec3 = new IVec3(vec3, y, z);
        }
        if(vec3 instanceof IVec3 === false) {
            vec3 = new IVec3(vec3.x, vec3.y, vec3.z);
        }
        const block = this.getBlock(vec3);
        return block.typeId === "minecraft:air" || block.typeId === "air";
    }

    /**
     * @name setBlock
     * @description Sets a block at the specified coordinates in the dimension.
     * @param {string} block - The block to set, string representing the block id, e.g., "minecraft:stone".
     * @param {IVec3|{x: number, y: number, z: number}|number} vec3 - The coordinates where the block should be set, either as an IVec3 object or an object with x, y, and z properties.
     * @param {number} [y=null] - The y-coordinate of the block, if vec3 is not an IVec3 or object.
     * @param {number} [z=null] - The z-coordinate of the block, if vec3 is not an IVec3 or object.
     * @example
     * const overworld = new IDimension("overworld");
     * // Set a stone block at coordinates (0, 64, 0)
     * overworld.setBlock("minecraft:stone", new IVec3(0, 64, 0));
     * @returns {void}
     * @throws {Error} - Throws an error if the block is not a string or if the coordinates are invalid.
     * @throws {TypeError} - Throws a TypeError if the coordinates are not IVec3 objects or objects with x, y, and z properties.
     * @throws {Error} - If the function fails to set the block, it will throw an error with a message indicating the failure.
     */
    setBlock(block, vec3, y = null, z = null) {
        if (y !== null && z !== null) {
            vec3 = { x: vec3, y: y, z: z };
        }
        if(vec3 instanceof IVec3 === true) {
            vec3 = { x: vec3.x, y: vec3.y, z: vec3.z };
        }
        // If the block isnt a mc.BLock or IBlock, throw an error
        if (typeof block !== "string") {
            throw new Error("Block must be represented as a string (block id), e.g., 'minecraft:stone'.");
        }
        // If the block doesn't start with "minecraft:", prepend it
        if (!block.startsWith("minecraft:")) {
            block = `minecraft:${block}`;
        }

        // If the block is a string, create a new IBlock with the block id
        try {
            this.dimension.setBlockType(block, { x: vec3.x, y: vec3.y, z: vec3.z });
        } catch (error) {
            throw new Error(`Failed to set block at (${vec3.x}, ${vec3.y}, ${vec3.z}) in dimension '${this.id}': ${error.message}`);
        }
    }

    /**
     * @name fill
     * @description Fills an area with a specified block type between two coordinates in the dimension.
     * @param {string} block - The block type to fill the area with, e.g., "minecraft:stone".
     * @param {IVec3|{x: number, y: number, z: number}} startVec3 - The starting coordinates of the area to fill, either as an IVec3 object or an object with x, y, and z properties.
     * @param {IVec3|{x: number, y: number, z: number}} endVec3 - The ending coordinates of the area to fill, either as an IVec3 object or an object with x, y, and z properties.
     * @example
     * const overworld = new IDimension("overworld");
     * // Fill a 3x3x3 area with stone blocks starting from (0, 64, 0) to (2, 66, 2)
     * overworld.fill("minecraft:stone", new IVec3(0, 64, 0), new IVec3(2, 66, 2));
     * @returns {void}
     * @throws {Error} - Throws an error if the block is not a string or if the coordinates are invalid.
     * @throws {TypeError} - Throws a TypeError if the coordinates are not IVec3 objects or objects with x, y, and z properties.
     * @throws {Error} - If the function fails to fill the area, it will throw an error with a message indicating the failure.
     */
    fill(block, startVec3, endVec3) {
        if (typeof block !== "string") {
            throw new Error("Block must be represented as a string (block id), e.g., 'minecraft:stone'.");
        }
        if (!block.startsWith("minecraft:")) {
            block = `minecraft:${block}`;
        }
        // If the start and end vectors are not IVec3 objects, convert them
        if (!(startVec3 instanceof IVec3)) {
            if (typeof startVec3 === "object" && "x" in startVec3 && "y" in startVec3 && "z" in startVec3) {
                startVec3 = new IVec3(startVec3.x, startVec3.y, startVec3.z);
            } else {
                throw new TypeError("startVec3 must be an IVec3 object or an object with x, y, and z properties.");
            }
        }
        try {
            // Get all blocks in the area defined by startVec3 and endVec3
            const start = startVec3.clone();
            const end = endVec3.clone();

            const blockPositions = [];
            for (let x = start.x; x <= end.x; x++) {
                for (let y = start.y; y <= end.y; y++) {
                    for (let z = start.z; z <= end.z; z++) {
                        blockPositions.push({ x, y, z });
                    }
                }
            }
            blockPositions.forEach(pos => { this.setBlock(block, pos); })
        } catch (error) {
            throw new Error(`Failed to fill area between (${startVec3.x}, ${startVec3.y}, ${startVec3.z}) and (${endVec3.x}, ${endVec3.y}, ${endVec3.z}) in dimension '${this.id}': ${error.message}`);
        }
    }
}