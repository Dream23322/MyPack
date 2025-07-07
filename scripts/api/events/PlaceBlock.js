import * as mc from "@minecraft/server";
import { IBlock } from "../classes/IBlock";

/**
 * @event playerPlaceBlock - Before Event
 * @description This event is triggered when a player places a block in the world (pre).
 * @param {Object} eventData - The data associated with the event.
 * @param {mc.Player} eventData.player - The player who placed the block.
 * @param {mc.Block} eventData.block - The block that was placed.
 * @example
 * mc.world.beforeEvents.playerPlaceBlock.subscribe((eventData) => {
 *   const player = eventData.player;
 *   const block = eventData.block;
 *   const iblock = new IBlock(block.location.x, block.location.y, block.location.z, block.dimension.id);
 * 
 *   // You can now use the iblock object to interact with the broken block.
 *   // For example, you can cancel the event if the block is "minecraft:stone"
 *   if (iblock.type === "minecraft:stone") {
 *       eventData.cancel = true;
 *       console.log("Player tried to place a stone block, but the event was cancelled.");
 *   }
 * });
 */
mc.world.beforeEvents.playerPlaceBlock.subscribe((eventData) => {
    const player = eventData.player;
    const block = eventData.block;
    const iblock = new IBlock(block.location.x, block.location.y, block.location.z);

    // You can now use the iblock object to interact with the placed block.
    
});

/**
 * @event playerPlaceBlock - After Event
 * @description This event is triggered when a player places a block in the world (post).
 * @param {Object} eventData - The data associated with the event.
 * @param {mc.Player} eventData.player - The player who placed the block.
 * @param {mc.Block} eventData.block - The block that was placed.
 * @example
 * mc.world.afterEvents.playerPlaceBlock.subscribe((eventData) => {
 *   const player = eventData.player;
 *   const block = eventData.block;
 *   const iblock = new IBlock(block.location.x, block.location.y, block.location.z, block.dimension.id);
 * 
 *   // You can now use the iblock object to interact with the placed block.
 *   // For example, you can change the block type:
 *   iblock.setBlock("minecraft:stone");
 *   // Or check if the block is air:
 *   if (iblock.isAir) {
 *       console.log("The placed block is air.");
 *   }
 */
mc.world.afterEvents.playerPlaceBlock.subscribe((eventData) => {
    const player = eventData.player;
    const block = eventData.block
    const iblock = new IBlock(block.location.x, block.location.y, block.location.z, block.dimension.id);

    // You can now use the iblock object to interact with the placed block.
});