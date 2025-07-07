import * as mc from "@minecraft/server";
import { IVec3 } from "./IVec3";
import { IDimension } from "./IDimension";

// This file is part of the IBlock class, which represents a block in the Minecraft world.
// It provides methods to interact with blocks, such as getting the block above or below, and adding vectors to the block's coordinates.

/**
 * Represents a block in the Minecraft world.
 * @class
 * @constructor dimension - The dimension ID of the block (default is "overworld").
 * @constructor {number|IVec3|{x: number, y: number, z: number}} vec3 - Can be an object with x, y, and z properties or an IVec3 object, can also just be x if y and z are not null.
 * @constructor {number} y - The y-coordinate of the block.
 * @constructor {number} z - The z-coordinate of the block.
 * @property {number} x - The x-coordinate of the block.
 * @property {number} y - The y-coordinate of the block.
 * @property {number} z - The z-coordinate of the block.
 * @property {mc.Block} block - The block object (mc/server).
 * @property {string} type - The type ID of the block.
 * @property {string} dimension - The dimension ID of the block.
 * @property {boolean} isAir - Whether the block is air.
 * @property {number} placeTime - The time when the block was placed (in milliseconds since epoch).
 * @example 
 * const block = new IBlock(42, 102, -83);
 * block.x; // 42
 * block.y; // 102
 * block.z; // -83
 * 
 * // To get the block type
 * block.type; // e.g., "minecraft:stone"
 */
export class IBlock {
    constructor(dimension = "overworld", vec3, y = null, z = null) {
        if (y !== null && z !== null) {
            this.x = vec3;
            this.y = y;
            this.z = z;
        } else {
            this.x = vec3.x;
            this.y = vec3.y;
            this.z = vec3.z;
        }

        if(dimension instanceof IDimension) {
            this.dimension = /** @type {IDimension} */ dimension.id;
        }

        this.vector = y === null && z === null ? vec3 : new IVec3(vec3, y, z);
        this.block = mc.world.getDimension(dimension).getBlock({ x: this.x, y: this.y, z: this.z });
        this.type = this.block.typeId;
        this.isAir = this.block.isAir;
        this.placeTime = Date.now();
    }

    /**
     * @name getBlock
     * @example
     * const block = new IBlock(42, 102, -83);
     * const blockObject = block.getBlock(); // Returns the mc.Block object at (42, 102, -83)
     * @returns {mc.Block} - Returns the block object at the specified coordinates.
     */
    getBlock() {
        return this.block;
    }

    /**
     * @name updateBlock
     * @description Updates the block object to reflect the current state of the block at the specified coordinates.
     * @example
     * const block = new IBlock(42, 102, -83); // eg. block.type is "minecraft:stone"
     * 
     * // After some time, the block might change in the world
     * // e.g., the block at (42, 102, -83) is now dirt
     * block.updateBlock(); // Refreshes the block object to match the current state in the world
     * 
     * console.log(block.type); // Now this will output "minecraft:dirt" if the block has changed
     * @returns {void}
     */
    updateBlock() {
        this.block = mc.world.getDimension(this.dimension).getBlock({ x: this.x, y: this.y, z: this.z });
        this.type = this.block.typeId;
        this.isAir = this.block.isAir;
    }

    /**
     * @name refreshBlock
     * @description Refreshes the block at the specified coordinates to ensure it matches the current state of the block object.
     * @example
     * const block = new IBlock(42, 102, -83);
     * block.refreshBlock(); // This will reset the block to match the current state of the IBlock object
     * @returns {void}
     */
    refreshBlock() {
        this.setBlock(this.type);
        this.updateBlock();
    }

    /**
     * @name setBlock
     * @description Sets the block at the specified coordinates to a new block type.
     * @param {string} blockType - The type ID of the block to set.
     * @example
     * const block = new IBlock(42, 102, -83);
     * block.setBlock("minecraft:stone"); // Sets the block at (42, 102, -83) to stone
     * @returns {void}
     */
    setBlock(blockType) {
        const dimension = mc.world.getDimension(this.dimension);
        const blockLocation = { x: this.x, y: this.y, z: this.z };
        dimension.setBlockType(blockLocation, blockType);
        this.updateBlock();
    }

    /**
     * @param {string} type - The type of object to return. Can be "block" (mc.Block), "vector" (IVec3), or "iblock" (IBlock).
     * @returns {mc.Block|IVec3|IBlock} - Returns the block, vector, or IBlock object based on the type specified.
     * @throws {Error} - Throws an error if the type is not one of the specified options.
     */
    down(type = "block") {
        switch(type) {
            case "isoblock":
                return new IBlock(this.x, this.y - 1, this.z);
            case "block":
                return new mc.world.getDimension(this.dimension).getBlock({ x: this.x, y: this.y - 1, z: this.z });
            case "vector":
                this.y -= 1;
                return new IVec3(this.x, this.y, this.z);
            default:
                throw new Error("Invalid type. Must be 'block', 'vector', or 'iblock'.");
        }
    }

    /**
     * @param {string} type - The type of object to return. Can be "block" (mc.Block), "vector" (IVec3), or "iblock" (IBlock).
     * @returns {mc.Block|IVec3|IBlock} - Returns the block, vector, or IBlock object based on the type specified.
     * @throws {Error} - Throws an error if the type is not one of the specified options.
     */
    up(type = "block") {
        switch(type) {
            case "isoblock":
                return new IBlock(this.x, this.y + 1, this.z);
            case "block":
                return new mc.world.getDimension(this.dimension).getBlock({ x: this.x, y: this.y + 1, z: this.z });
            case "vector":
                this.y += 1;
                return new IVec3(this.x, this.y, this.z);
            default:
                throw new Error("Invalid type. Must be 'block', 'vector', or 'iblock'.");
        }
    }

    /**
     * @name addVector
     * @description Adds a vector to the block's coordinates.
     * @param {IVec3} vector - The vector to add.
     * @returns {IBlock} - Returns a new IBlock with the updated coordinates.
     */
    addVector(vector) {
        return new IBlock(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
}